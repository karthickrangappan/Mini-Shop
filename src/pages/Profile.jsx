import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaUser, FaEnvelope, FaCalendarAlt, FaShieldAlt, FaCamera, FaSave, FaUserEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user } = useContext(ShopContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        address: ''
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        toast.success('Profile details updated (Simulated)');
        setIsEditing(false);
    };

    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden text-center p-8">
                            <div className="relative inline-block group">
                                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-4 ring-4 ring-primary/20 transition-all group-hover:ring-primary/40 overflow-hidden">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                                    ) : (
                                        <FaUser className="text-5xl text-primary" />
                                    )}
                                </div>
                                <button className="absolute bottom-4 right-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-black transition-all">
                                    <FaCamera className="text-sm" />
                                </button>
                            </div>

                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-wide mt-2">
                                {user.displayName || "Shopper"}
                            </h3>
                            <p className="text-gray-500 text-sm font-medium mb-6">Premium Member</p>

                            <div className="h-px bg-gray-50 w-full mb-6"></div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium hover:text-primary transition-colors cursor-pointer justify-center md:justify-start">
                                    <FaEnvelope className="text-gray-400" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium hover:text-primary transition-colors cursor-pointer justify-center md:justify-start">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <span>Joined March 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10 h-full">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                                <h4 className="text-lg font-black uppercase tracking-widest text-gray-800 flex items-center gap-3">
                                    <FaShieldAlt className="text-primary" /> Personal Information
                                </h4>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-primary hover:text-black font-bold uppercase text-xs tracking-widest flex items-center gap-2 transition-colors"
                                >
                                    {isEditing ? 'Cancel' : <><FaUserEdit /> Edit</>}
                                </button>
                            </div>

                            <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed font-medium text-gray-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        disabled
                                        value={formData.email}
                                        className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed font-medium text-gray-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        disabled={!isEditing}
                                        placeholder="+1 234 567 890"
                                        className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed font-medium text-gray-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Preferred Size</label>
                                    <select
                                        disabled={!isEditing}
                                        className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed font-medium text-gray-900 appearance-none"
                                    >
                                        <option>UK 8</option>
                                        <option>UK 9</option>
                                        <option>UK 10</option>
                                    </select>
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Shipping Address</label>
                                    <textarea
                                        disabled={!isEditing}
                                        placeholder="Enter your default shipping address"
                                        rows="3"
                                        className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed font-medium text-gray-900"
                                    />
                                </div>

                                {isEditing && (
                                    <div className="sm:col-span-2 pt-4">
                                        <button
                                            type="submit"
                                            className="w-full bg-black text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-all shadow-lg flex items-center justify-center gap-3"
                                        >
                                            <FaSave /> Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
