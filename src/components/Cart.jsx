import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cartItems, updateCartQuantity, removeFromCart, placeOrder } = useContext(ShopContext);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const shipping = subtotal > 0 ? 15 : 0;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-10 rounded-2xl shadow-sm flex flex-col items-center max-w-md w-full text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <FaShoppingCart className="text-4xl text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-wider mb-2 text-gray-800">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        to="/shop"
                        className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-all duration-300 w-full"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-gray-900 border-b-2 border-primary inline-block pb-2">
                        Shopping Cart
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-2/3 flex flex-col gap-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.cartDocId || item.id}
                                className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                                    <img
                                        src={item.img || item.image || "https://via.placeholder.com/150"}
                                        alt={item.name}
                                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                                    />
                                </div>

                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide mb-1">
                                        {item.name}
                                    </h3>
                                    {item.category && (
                                        <p className="text-sm text-gray-400 capitalize mb-1">{item.category}</p>
                                    )}
                                    {item.size && (
                                        <p className="text-sm font-bold text-gray-800 mb-4">
                                            Size: <span className="text-primary">{item.size}</span>
                                        </p>
                                    )}
                                    <div className="text-primary font-bold text-xl">
                                        ₹{item.price.toFixed(2)}
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center bg-gray-50 rounded-full border border-gray-200">
                                        <button
                                            onClick={() => updateCartQuantity(item.cartDocId, (item.quantity || 1) - 1)}
                                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 rounded-l-full transition-colors"
                                        >
                                            <FaMinus className="text-xs" />
                                        </button>
                                        <span className="w-10 text-center font-semibold text-gray-800">
                                            {item.quantity || 1}
                                        </span>
                                        <button
                                            onClick={() => updateCartQuantity(item.cartDocId, (item.quantity || 1) + 1)}
                                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 rounded-r-full transition-colors"
                                        >
                                            <FaPlus className="text-xs" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.cartDocId)}
                                        className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors duration-300 shadow-sm"
                                        title="Remove Item"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest mb-6 pb-4 border-b border-gray-100">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping Estimate</span>
                                    <span className="font-semibold text-gray-900">₹{shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax Estimate</span>
                                    <span className="font-semibold text-gray-900">₹0.00</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold uppercase tracking-wide text-gray-900">Total</span>
                                    <span className="text-2xl font-black text-primary">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl inline-block text-center"
                            >
                                Checkout Now
                            </Link>

                            <div className="mt-6 text-center">
                                <Link to="/shop" className="text-sm font-semibold text-gray-500 hover:text-black transition-colors underline-offset-4 hover:underline">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
