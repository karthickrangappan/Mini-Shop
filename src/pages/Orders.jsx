import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaBoxOpen, FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaCreditCard, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Orders = () => {
    const { orders, ordersLoading, toggleOrderDetails, expandedOrders, fetchedOrders } = useContext(ShopContext);

    useEffect(() => {
        fetchedOrders();
    }, []);

    if (ordersLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-10 rounded-2xl shadow-sm flex flex-col items-center max-w-md w-full text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <FaBoxOpen className="text-4xl text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-wider mb-2 text-gray-800">No Orders Yet</h2>
                    <p className="text-gray-500 mb-8">You haven't placed any orders with us yet. Start shopping to see your history here!</p>
                    <Link
                        to="/shop"
                        className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-all duration-300 w-full"
                    >
                        Go to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'paid': return 'bg-green-100 text-green-700';
            case 'delivered': return 'bg-blue-100 text-blue-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div
                                className="p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                                onClick={() => toggleOrderDetails(order.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                                        <FaBoxOpen className="text-xl text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 uppercase tracking-wider">#{order.orderId}</h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                            <FaCalendarAlt />
                                            {order.createdAt.toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Amount</p>
                                        <p className="font-black text-gray-900 text-lg">${order.total}</p>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                    {expandedOrders[order.id] ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
                                </div>
                            </div>

                            {expandedOrders[order.id] && (
                                <div className="border-t border-gray-50 bg-gray-50/50 p-6 space-y-8 animate-fade-in-up">
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-[2px] text-gray-400 mb-4 px-2">Order Items</h4>
                                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className={`p-4 flex items-center gap-6 ${idx !== order.items.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                                    <img
                                                        src={item.img || item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-contain bg-gray-50 rounded-lg p-1"
                                                    />
                                                    <div className="flex-grow">
                                                        <h5 className="font-bold text-gray-800 text-sm uppercase">{item.name}</h5>
                                                        <p className="text-xs text-gray-500 font-medium mt-1">
                                                            Quantity: <span className="text-gray-900 font-bold">{item.quantity}</span>
                                                            {item.size && <span> | Size: <span className="text-primary font-bold">{item.size}</span></span>}
                                                        </p>
                                                    </div>
                                                    <p className="font-bold text-gray-900">${item.price * item.quantity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8 px-2">
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-black uppercase tracking-[2px] text-gray-400 flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-primary" /> Delivery Details
                                            </h4>
                                            <div className="text-sm text-gray-600 space-y-1 font-medium bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                <p className="font-bold text-gray-900">{order.customer?.name}</p>
                                                <p>{order.customer?.address}</p>
                                                <p>{order.customer?.city}, {order.customer?.pincode}</p>
                                                <p className="pt-2 text-xs border-t border-gray-50 mt-2">Phone: {order.customer?.phone}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-xs font-black uppercase tracking-[2px] text-gray-400 flex items-center gap-2">
                                                <FaCreditCard className="text-primary" /> Payment Method
                                            </h4>
                                            <div className="text-sm text-gray-600 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                <p className="font-bold text-gray-900 uppercase">{order.paymentType}</p>
                                                <p className="text-xs text-gray-400 mt-1 truncate">ID: {order.paymentId}</p>
                                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                                                    <span className="font-bold text-gray-900 uppercase text-xs">Final Amount</span>
                                                    <span className="text-xl font-black text-primary">${order.total}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
