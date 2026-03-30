import { useState, useEffect, useContext } from 'react';
import { FaSearch, FaShoppingCart, FaBars, FaTimes, FaUser, FaHeart, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { cartItems, wishlist, user, logout } = useContext(ShopContext);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Shop', path: '/shop' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    const activeLinkStyle = 'text-primary';

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] py-3'
            : 'bg-white py-5 shadow-sm'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link to="/" className="text-2xl sm:text-3xl font-black uppercase tracking-[0.2em] cursor-pointer hover:opacity-80 transition-opacity">
                    Mini<span className="text-primary">shop</span>
                </Link>

                <div className="hidden lg:flex items-center gap-10 font-medium text-sm tracking-widest uppercase text-gray-800">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative group transition-colors duration-300 hover:text-primary ${isActive ? activeLinkStyle : ''}`
                            }
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </NavLink>
                    ))}
                </div>

                <div className="hidden lg:flex items-center gap-6 text-gray-600">

                    <Link to="/wishlist" className="relative cursor-pointer group hover:scale-110 transition-transform duration-300">
                        <FaHeart className="group-hover:text-primary transition-colors text-2xl" />
                        <span className="absolute -top-1.5 -right-2 bg-primary text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                            {wishlist.length}
                        </span>
                    </Link>
                    <Link to="/cart" className="relative cursor-pointer group hover:scale-110 transition-transform duration-300">
                        <FaShoppingCart

                            className="group-hover:text-primary transition-colors text-2xl" />
                        <span className="absolute -top-1.5 -right-2 bg-primary text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                            {cartItems.length}
                        </span>
                    </Link>
                    {user ? (
                        <div className="relative group cursor-pointer flex items-center gap-2 py-1">
                            <FaUser className="text-xl text-gray-800" />
                            <span className="text-sm font-bold capitalize hidden sm:inline-block text-gray-800">{user.displayName || "User"}</span>
                            <div className="absolute top-full right-0 mt-3 w-48 bg-white shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 z-50 border border-gray-100 overflow-hidden translate-y-2 group-hover:translate-y-0">
                                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group/item">
                                    <FaUser className="text-gray-400 group-hover/item:text-primary transition-colors" />
                                    <span className="font-semibold">My Profile</span>
                                </Link>
                                <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group/item">
                                    <FaShoppingBag className="text-gray-400 group-hover/item:text-primary transition-colors" />
                                    <span className="font-semibold">My Orders</span>
                                </Link>
                                <div className="h-px bg-gray-100 my-1 mx-2"></div>
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl font-bold transition-colors group/item"
                                >
                                    <FaSignOutAlt className="text-red-400 group-hover/item:text-red-600 transition-colors" />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="hover:text-primary transition-transform duration-300 hover:scale-110 focus:outline-none">
                            <FaUser className="text-xl" />
                        </Link>
                    )}
                </div>

                <button
                    className="lg:hidden text-gray-800 text-2xl hover:text-primary transition-colors focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-500 ease-in-out overflow-hidden flex flex-col ${isOpen ? 'max-h-96 py-6 border-t border-gray-100 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                <div className="flex flex-col items-center gap-5">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `font-semibold text-lg hover:text-primary tracking-widest uppercase transition-colors ${isActive ? activeLinkStyle : ''}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <div className="flex items-center gap-8 mt-4 pt-4 border-t border-gray-100 w-[80%] justify-center text-gray-600">
                        <button className="text-2xl hover:text-primary cursor-pointer transition-colors">
                            <FaSearch />
                        </button>
                        <Link to="/wishlist" className="relative cursor-pointer hover:scale-105 transition-transform" onClick={() => setIsOpen(false)}>
                            <FaHeart className="text-2xl hover:text-primary transition-colors" />
                            <span className="absolute -top-1.5 -right-2 bg-primary text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                                3
                            </span>
                        </Link>
                        <Link to="/cart" className="relative cursor-pointer hover:scale-105 transition-transform" onClick={() => setIsOpen(false)}>
                            <FaShoppingCart className="text-2xl hover:text-primary transition-colors" />
                            <span className="absolute -top-1.5 -right-2 bg-primary text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                                2
                            </span>
                        </Link>
                        {user ? (
                            <button onClick={() => { logout(); setIsOpen(false); }} className="text-lg font-bold text-red-500 hover:text-red-600 transition-colors">
                                Log Out
                            </button>
                        ) : (
                            <Link to="/login" className="text-2xl hover:text-primary cursor-pointer transition-colors" onClick={() => setIsOpen(false)}>
                                <FaUser />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
