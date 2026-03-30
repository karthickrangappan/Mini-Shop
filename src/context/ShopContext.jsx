import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { toast } from "react-hot-toast";

import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState({});

  const ADMIN_EMAIL = "admin@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        await setDoc(doc(db, "users", u.uid), { isActive: true }, { merge: true });
      }
      setUser(u || null);
    });
    return () => unsubscribe();
  }, []);

  const createUserDocument = async (firebaseUser) => {
    if (!firebaseUser) return;

    const role = firebaseUser.email === ADMIN_EMAIL ? "admin" : "user";

    await setDoc(
      doc(db, "users", firebaseUser.uid),
      {
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email,
        role,
        isActive: true,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  const fetchedOrders = async () => {
    if (!user) return;

    try {
      setOrdersLoading(true);

      const snap = await getDocs(collection(db, "users", user.uid, "orders"));

      const fetched = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        };
      });

      fetched.sort((a, b) => b.createdAt - a.createdAt);

      setOrders(fetched);
      setOrdersLoading(false);
    } catch {
      toast.error("Failed to fetch orders");
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchedOrders();
    else {
      setOrders([]);
      setExpandedOrders({});
    }
  }, [user]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setWishlist([]);
      return;
    }

    const fetchCart = async () => {
      const snap = await getDocs(collection(db, "users", user.uid, "cart"));
      const items = snap.docs.map((d) => ({
        ...d.data(),
        cartDocId: d.id,
      }));
      setCartItems(items);
    };

    const fetchWishlist = async () => {
      const snap = await getDocs(collection(db, "users", user.uid, "wishlist"));
      const items = snap.docs.map((d) => ({
        ...d.data(),
        wishlistDocId: d.id,
      }));
      setWishlist(items);
    };

    fetchCart();
    fetchWishlist();
  }, [user]);

  const addToCart = async (product) => {
    if (!user) {
      toast.dismiss();
      return toast.error("Login First");
    }

    if (product.sizes && Object.keys(product.sizes).length > 0 && !product.size) {
      toast.dismiss();
      return toast.error("Please select a size first!");
    }

    const cartRef = collection(db, "users", user.uid, "cart");
    const q = query(cartRef, where("id", "==", product.id));
    const snap = await getDocs(q);

    let existingDoc = null;

    snap.forEach((docItem) => {
      const data = docItem.data();
      const productSize = product.size || null;
      const dataSize = data.size || null;

      if (dataSize === productSize) {
        existingDoc = { id: docItem.id, ...data };
      }
    });

    if (existingDoc) {
      const qty = existingDoc.quantity || 1;

      await updateDoc(doc(db, "users", user.uid, "cart", existingDoc.id), {
        quantity: qty + 1,
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item.cartDocId === existingDoc.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      toast.dismiss();
      toast.success("Increased quantity in Cart");
    } else {
      const docRef = await addDoc(cartRef, {
        ...product,
        quantity: product.quantity || 1,
        createdAt: serverTimestamp(),
      });

      setCartItems((prev) => [
        ...prev,
        { ...product, quantity: product.quantity || 1, cartDocId: docRef.id },
      ]);

      toast.dismiss();
      toast.success("Added to Cart Successfully");
    }
  };

  const removeFromCart = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "cart", id));
    setCartItems((prev) => prev.filter((item) => item.cartDocId !== id));
  };

  const updateCartQuantity = async (id, qty) => {
    if (!user) return;
    if (qty <= 0) return removeFromCart(id);

    await updateDoc(doc(db, "users", user.uid, "cart", id), { quantity: qty });

    setCartItems((prev) =>
      prev.map((item) =>
        item.cartDocId === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const addToWishlist = async (product) => {
    if (!user) {
      toast.dismiss();
      return toast.error("Login First");
    }

    const wishlistRef = collection(db, "users", user.uid, "wishlist");
    const q = query(wishlistRef, where("id", "==", product.id));
    const snap = await getDocs(q);

    if (!snap.empty) {
      toast.dismiss();
      return toast.error("Product already exists in Wishlist!");
    }

    const docRef = await addDoc(wishlistRef, {
      ...product,
      createdAt: serverTimestamp(),
    });

    setWishlist((prev) => [...prev, { ...product, wishlistDocId: docRef.id }]);

    toast.dismiss();
    toast.success("Added to Wishlist Successfully");
  };

  const removeFromWishlist = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "wishlist", id));
    setWishlist((prev) => prev.filter((item) => item.wishlistDocId !== id));
  };

  const placeOrder = async (orderData) => {
    if (!user) return false;
    if (!cartItems.length) return false;

    try {
      const orderNumber = await runTransaction(db, async (t) => {
        const counterRef = doc(db, "counters", "orders");
        const counterDoc = await t.get(counterRef);

        const currentNumber = counterDoc.exists()
          ? counterDoc.data().currentNumber
          : 0;

        const newNumber = currentNumber + 1;

        t.set(counterRef, { currentNumber: newNumber }, { merge: true });

        return newNumber;
      });

      const orderId = "ORD" + String(orderNumber).padStart(4, "0");

      await addDoc(collection(db, "users", user.uid, "orders"), {
        orderId,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: "Pending",
        ...orderData,
        createdAt: serverTimestamp(),
      });

      const snap = await getDocs(collection(db, "users", user.uid, "cart"));

      await Promise.all(
        snap.docs.map((d) =>
          deleteDoc(doc(db, "users", user.uid, "cart", d.id))
        )
      );

      setCartItems([]);
      await fetchedOrders();
      toast.success("Order Placed Successfully");
      return true;
    } catch {
      toast.error("Order Failed");
      return false;
    }
  };

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", result.user.uid), { isActive: true }, { merge: true });
    return result.user;
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserDocument(result.user);
    return result.user;
  };

  const handleRegister = async (username, email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: username });
    await createUserDocument(result.user);
    setUser(result.user);
    return result.user;
  };

  const logout = async () => {
    if (user) {
      await setDoc(doc(db, "users", user.uid), { isActive: false }, { merge: true });
    }

    await signOut(auth);
    setUser(null);
    setCartItems([]);
    setWishlist([]);
    setOrders([]);
    setExpandedOrders({});
  };

  return (
    <ShopContext.Provider
      value={{
        user,
        cartItems,
        wishlist,
        orders,
        ordersLoading,
        expandedOrders,
        toggleOrderDetails,
        fetchedOrders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        placeOrder,
        handleLogin,
        handleGoogleLogin,
        handleRegister,
        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};