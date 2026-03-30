import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaTrash, FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const { wishlist, removeFromWishlist, addToCart } = useContext(ShopContext);

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-10 rounded-2xl shadow-sm flex flex-col items-center max-w-md w-full text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <FaHeart className="text-4xl text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-wider mb-2 text-gray-800">Your Wishlist is Empty</h2>
                    <p className="text-gray-500 mb-8">Save items you love to your wishlist to buy them later.</p>
                    <Link
                        to="/shop"
                        className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-all duration-300 w-full"
                    >
                        Discover Products
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
                        My Wishlist
                    </h1>
                    <p className="mt-4 text-gray-500 font-medium">
                        {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} saved
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlist.map((item) => (
                        <div
                            key={item.wishlistDocId || item.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative w-full h-[250px] bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
                                <img
                                    src={item.img || item.image || "https://via.placeholder.com/250"}
                                    alt={item.name}
                                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                />
                                <button
                                    onClick={() => removeFromWishlist(item.wishlistDocId)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white shadow-md text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors duration-300 z-10"
                                    title="Remove from Wishlist"
                                >
                                    <FaTrash className="text-sm" />
                                </button>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide mb-1 truncate">
                                    {item.name}
                                </h3>
                                {item.category && (
                                    <p className="text-xs text-gray-400 capitalize mb-1">{item.category}</p>
                                )}
                                {item.size && (
                                    <p className="text-xs font-bold text-gray-800 mb-3">
                                        Size: <span className="text-primary">{item.size}</span>
                                    </p>
                                )}
                                <div className="text-primary font-black text-xl mb-6">
                                    ${item.price.toFixed(2)}
                                </div>

                                <div className="mt-auto">
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-full font-bold uppercase tracking-wide text-xs hover:bg-primary hover:text-black transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        <FaShoppingCart />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
