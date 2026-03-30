import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-black text-gray-400 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div>
                        <h3 className="text-white text-xl font-bold uppercase mb-8 tracking-wider">Minishop</h3>
                        <p className="mb-8 leading-relaxed">
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-primary hover:text-black transition-all hover:scale-110">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-primary hover:text-black transition-all hover:scale-110">
                                <FaFacebookF className="text-xl" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-primary hover:text-black transition-all hover:scale-110">
                                <FaInstagram className="text-xl" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white text-xl font-bold uppercase mb-8 tracking-wider">Menu</h3>
                        <ul className="space-y-4">
                            <li><Link to="/shop" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-gray-600">-</span> Shop</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-gray-600">-</span> About</Link></li>
                            <li><Link to="/blog" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-gray-600">-</span> Journal</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-gray-600">-</span> Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white text-xl font-bold uppercase mb-8 tracking-wider">Help</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-gray-600">-</span> Shipping Information</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-gray-600">-</span> Returns & Exchange</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-gray-600">-</span> Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-gray-600">-</span> Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white text-xl font-bold uppercase mb-8 tracking-wider">Have a Question?</h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4 cursor-pointer group">
                                <FaMapMarkerAlt className="text-gray-600 group-hover:text-primary transition-colors shrink-0 text-xl mt-1" />
                                <span className="group-hover:text-white transition-colors">203 Fake St. Mountain View, San Francisco, California, USA</span>
                            </li>
                            <li className="flex gap-4 cursor-pointer group">
                                <FaPhoneAlt className="text-gray-600 group-hover:text-primary transition-colors shrink-0 mt-1" />
                                <span className="group-hover:text-white transition-colors">+2 392 3929 210</span>
                            </li>
                            <li className="flex gap-4 cursor-pointer group">
                                <FaEnvelope className="text-gray-600 group-hover:text-primary transition-colors shrink-0 mt-1" />
                                <span className="group-hover:text-white transition-colors">info@yourdomain.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="text-center pt-8 border-t border-gray-900 text-sm">
                    <p>
                        Copyright © {new Date().getFullYear()} All rights reserved | This template is inspired by Colorlib
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
