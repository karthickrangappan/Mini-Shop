import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ShopContext } from '../context/ShopContext';
import toast from "react-hot-toast";
import {
  ChevronRight,
  CreditCard,
  Truck,
  MapPin,
  ShoppingBag,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Lock
} from 'lucide-react';


const Checkout = () => {
  const { cartItems: cart = [], placeOrder, user } = useContext(ShopContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      toast.dismiss();
      toast.error("Please fill all address details");
      return false;
    }

    if (!phoneRegex.test(form.phone)) {
      toast.dismiss();
      toast.error("Enter valid 10-digit phone number");
      return false;
    }

    if (!pincodeRegex.test(form.pincode)) {
      toast.dismiss();
      toast.error("Enter valid 6-digit pincode");
      return false;
    }

    if (!cart.length) {
      toast.dismiss();
      toast.error("Cart is empty");
      return false;
    }

    return true;
  };

  const handleCOD = async () => {
    if (!validateForm()) return;

    try {
      await placeOrder({
        customer: form,
        paymentType: "COD",
        paymentId: "COD",
        status: "Pending",
      });

      toast.error("Order placed successfully 🚚 (Cash on Delivery)");
      setTimeout(() => navigate("/orders"), 300);
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Order placement failed");
    }
  };

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleRazorpay = async () => {
    if (!validateForm()) return;

    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      toast.dismiss();
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_test_2ORD27rb7vGhwj",
      amount: total * 100,
      currency: "INR",
      name: "Mini Shop",
      description: "Order Payment",

      handler: async function (response) {
        try {
          await placeOrder({
            customer: form,
            paymentType: "Razorpay",
            paymentId: response.razorpay_payment_id,
            status: "Paid",
          });

          toast.error("Payment successful ✅");
          setTimeout(() => navigate("/orders"), 300);
        } catch (error) {
          console.error(error);
          toast.dismiss();
          toast.error("Order placement failed after payment");
        }
      },

      modal: {
        ondismiss: () => {
          toast.dismiss();
          toast.error("Payment cancelled ❌");
        },
      },

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },

      theme: {
        color: "#c9a84c",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-sans selection:bg-[#c9a84c]/20 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16">

        <header className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            <div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 hover:text-[#c9a84c] transition-colors mb-6 group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Cart
              </button>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#c9a84c] mb-2 block">
                Order Finalization
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-[#121212] tracking-tighter leading-tight italic">
                Checkout
              </h1>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                  <CheckCircle2 size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step 1</p>
                  <p className="text-xs font-bold text-[#121212]">Shipping</p>
                </div>
              </div>
              <div className="w-12 h-[1px] bg-gray-200" />
              <div className="flex items-center gap-4 opacity-50">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                  <CreditCard size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step 2</p>
                  <p className="text-xs font-bold text-[#121212]">Payment</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-7 space-y-12">

            <section>

              <div className="flex items-center gap-3 mb-8">
                <MapPin className="text-[#c9a84c]" size={20} />
                <h2 className="text-2xl font-black text-[#121212] italic tracking-tight">Delivery Details</h2>
                <div className="h-[1px] flex-1 bg-gray-100 ml-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="E.g. Alexander McQueen"
                    className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">Email Identity</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="alex@boutique.com"
                    className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">Contact Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">Complete Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Floor 4, Royal Heritage..."
                    className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="400001"
                    className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all"
                  />
                </div>
              </div>
            </section>

            <section>

              <div className="flex items-center gap-3 mb-8">
                <CreditCard className="text-[#c9a84c]" size={20} />
                <h2 className="text-2xl font-black text-[#121212] italic tracking-tight">Payment Method</h2>
                <div className="h-[1px] flex-1 bg-gray-100 ml-4" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`
                    flex-1 p-6 rounded-[2rem] border transition-all duration-500 text-left relative overflow-hidden group
                    ${paymentMethod === "razorpay"
                      ? 'bg-[#121212] border-[#121212] text-white shadow-2xl shadow-gray-400'
                      : 'bg-white border-gray-100 text-[#121212] hover:border-[#c9a84c] shadow-sm'}
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-2xl mb-4 flex items-center justify-center transition-colors
                    ${paymentMethod === "razorpay" ? 'bg-white/10 text-[#c9a84c]' : 'bg-gray-50 text-gray-400'}
                  `}>
                    <CreditCard size={24} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest mb-1">Razorpay Online</h3>
                  <p className={`text-[10px] font-medium ${paymentMethod === "razorpay" ? 'text-gray-400' : 'text-gray-500'}`}>
                    Credit/Debit Cards, UPI, Netbanking
                  </p>
                  {paymentMethod === "razorpay" && (
                    <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-[#c9a84c]" />
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`
                    flex-1 p-6 rounded-[2rem] border transition-all duration-500 text-left relative overflow-hidden group
                    ${paymentMethod === "cod"
                      ? 'bg-[#121212] border-[#121212] text-white shadow-2xl shadow-gray-400'
                      : 'bg-white border-gray-100 text-[#121212] hover:border-[#c9a84c] shadow-sm'}
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-2xl mb-4 flex items-center justify-center transition-colors
                    ${paymentMethod === "cod" ? 'bg-white/10 text-[#c9a84c]' : 'bg-gray-50 text-gray-400'}
                  `}>
                    <Truck size={24} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest mb-1">Cash on Delivery</h3>
                  <p className={`text-[10px] font-medium ${paymentMethod === "cod" ? 'text-gray-400' : 'text-gray-500'}`}>
                    Pay in cash upon successful delivery
                  </p>
                  {paymentMethod === "cod" && (
                    <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-[#c9a84c]" />
                  )}
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar / Summary Area */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-10 bg-white border border-gray-100 rounded-[3rem] p-8 md:p-10 shadow-xl shadow-gray-100 overflow-hidden">

              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/5 rounded-bl-[5rem] -mr-10 -mt-10" />

              <div className="flex items-center gap-3 mb-10">
                <ShoppingBag className="text-[#c9a84c]" size={20} />
                <h2 className="text-2xl font-black text-[#121212] italic tracking-tight">Order Summary</h2>
              </div>

              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl p-2 flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-[#121212] uppercase tracking-wider truncate">{item.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        Size: {item.size} <span className="mx-2">|</span> Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <p className="text-sm font-black text-[#121212] italic">₹{item.price * (item.quantity || 1)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-dashed border-gray-100 pt-8 mb-10">
                <div className="flex justify-between items-center px-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Subtotal</span>
                  <span className="text-sm font-bold text-[#121212]">₹{total}</span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Delivery Fee</span>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Free</span>
                </div>
                <div className="flex justify-between items-center px-8 py-6 bg-gray-50 rounded-3xl mt-6">
                  <span className="text-xs font-black text-[#121212] uppercase tracking-[0.2em]">Total Amount</span>
                  <span className="text-3xl font-black text-[#121212] italic tracking-tighter">₹{total}</span>
                </div>
              </div>

              <div className="space-y-6">
                {paymentMethod === "razorpay" ? (
                  <button
                    onClick={handleRazorpay}
                    className="w-full bg-[#121212] text-white py-6 rounded-2xl text-[10px] font-black tracking-[0.4em] uppercase hover:bg-[#c9a84c] hover:text-[#121212] transition-all duration-500 shadow-xl shadow-[#121212]/20 flex items-center justify-center gap-4 group"
                  >
                    Authorize Payment
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={handleCOD}
                    className="w-full bg-[#121212] text-white py-6 rounded-2xl text-[10px] font-black tracking-[0.4em] uppercase hover:bg-[#c9a84c] hover:text-[#121212] transition-all duration-500 shadow-xl shadow-[#121212]/20 flex items-center justify-center gap-4 group"
                  >
                    Confirm Order (COD)
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                <div className="flex items-center justify-center gap-6 mt-8 opacity-40">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-gray-400" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600">Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={12} className="text-gray-400" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600">SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;