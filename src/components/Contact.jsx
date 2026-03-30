import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaPaperPlane, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            toast.success('Your message has been sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt />,
            label: 'Address',
            value: '198 West 21th Street, Suite 721 New York NY 10016',
            color: 'bg-blue-50 text-blue-500'
        },
        {
            icon: <FaPhoneAlt />,
            label: 'Phone',
            value: '+ 1235 2355 98',
            color: 'bg-green-50 text-green-500'
        },
        {
            icon: <FaEnvelope />,
            label: 'Email',
            value: 'info@yoursite.com',
            color: 'bg-purple-50 text-purple-500'
        },
        {
            icon: <FaGlobe />,
            label: 'Website',
            value: 'yoursite.com',
            color: 'bg-orange-50 text-orange-500'
        }
    ];

    return (
        <div className="bg-white min-h-screen">

            <section className="py-24 -mt-16 relative z-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100">
                        <div className="flex flex-col lg:flex-row">

                            <div className="w-full lg:w-2/5 bg-gray-50 p-12 md:p-16">
                                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-8">
                                    Let's Get In <span className="text-primary">Touch</span>
                                </h2>
                                <p className="text-gray-500 mb-12 leading-relaxed">
                                    We're open for any suggestion or just to have a chat. Our team is dedicated to providing you with the best experience possible.
                                </p>

                                <div className="space-y-10">
                                    {contactInfo.map((info, idx) => (
                                        <div key={idx} className="flex gap-6 group">
                                            <div className={`w-14 h-14 rounded-2xl ${info.color} flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                                {info.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{info.label}</h4>
                                                <p className="text-gray-900 font-bold leading-snug">{info.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-16 pt-10 border-t border-gray-200">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Follow Us</h4>
                                    <div className="flex gap-4">
                                        {[<FaFacebookF />, <FaTwitter />, <FaInstagram />, <FaLinkedinIn />].map((icon, i) => (
                                            <button key={i} className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm">
                                                {icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-3/5 p-12 md:p-16">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your name"
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold placeholder:font-normal placeholder:text-gray-300"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="email@example.com"
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold placeholder:font-normal placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="What is this about?"
                                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold placeholder:font-normal placeholder:text-gray-300"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            placeholder="Write your message here..."
                                            className="w-full p-6 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold placeholder:font-normal placeholder:text-gray-300 resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="h-16 px-12 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-primary hover:text-black hover:shadow-[0_20px_40px_-5px_rgba(248,202,17,0.3)] transition-all duration-300 disabled:opacity-70 disabled:grayscale"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Send Message <FaPaperPlane className="text-sm" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-24 px-4">
                <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 h-[450px] bg-gray-100 relative group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4821323386016!2d-73.9967!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknNDguMSJX!5e0!3m2!1sen!2sus!4v1633000000000!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]"></div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
