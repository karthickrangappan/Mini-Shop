import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FaCalendarAlt, FaComments, FaArrowRight } from 'react-icons/fa';

import 'swiper/css';

const blogPosts = [
    {
        id: 1,
        title: "The Ultimate Guide to Modern Footwear Trends",
        summary: "Discover the latest shifts in the shoe industry, from sustainable materials to vibrant retro designs making a major comeback.",
        author: "Alex Rivers",
        date: "Oct 24, 2023",
        comments: 12,
        image: "/images/image_1.jpg",
        category: "Fashion"
    },
    {
        id: 2,
        title: "How to Choose the Perfect Performance Running Shoes",
        summary: "Not all running shoes are created equal. Learn how to identify the right cushioning and support for your specific gait.",
        author: "Sarah Jen",
        date: "Oct 21, 2023",
        comments: 8,
        image: "/images/image_2.jpg",
        category: "Lifestyle"
    },
    {
        id: 3,
        title: "Sneaker Care 101: Keep Your Kicks Looking Brand New",
        summary: "Cleaning and maintenance tips that will extend the life of your favorite sneakers and preserve their original shine.",
        author: "Mike Thompson",
        date: "Oct 18, 2023",
        comments: 15,
        image: "/images/image_3.jpg",
        category: "Tips"
    },
    {
        id: 4,
        title: "The Rise of Eco-Friendly Materials in Shoe Manufacturing",
        summary: "Exploring how leading brands are integrating recycled plastics and organic fibers into their latest collections.",
        author: "Elena Gray",
        date: "Oct 15, 2023",
        comments: 5,
        image: "/images/image_5.jpg",
        category: "Sustainability"
    },
    {
        id: 5,
        title: "Formal Shoes for Every Professional Occasion",
        summary: "A breakdown of essential formal styles every wardrobe needs, from classic oxfords to versatile loafers.",
        author: "David Chen",
        date: "Oct 12, 2023",
        comments: 22,
        image: "/images/image_6.jpg",
        category: "Workspace"
    },
    {
        id: 6,
        title: "Walking Comfort: Why Sole Technology Matters",
        summary: "Deep dive into the engineering behind maximum comfort soles and how they protect your posture during long walks.",
        author: "Jessica Alba",
        date: "Oct 09, 2023",
        comments: 10,
        image: "/images/image_1.jpg",
        category: "Health"
    }
];

const Blog = () => {
    return (
        <div className="bg-white min-h-screen">

            <main className="py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        spaceBetween={30}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-20"
                    >
                        {blogPosts.map((post) => (
                            <SwiperSlide key={post.id}>
                                <article className="group relative flex flex-col h-full animate-fade-in-up">
                                    <div className="relative overflow-hidden aspect-[4/3] rounded-[2.5rem] mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                        />
                                        <div className="absolute top-6 left-6 z-10">
                                            <span className="bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                                                {post.category}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                                    </div>

                                    <div className="flex flex-col flex-grow px-2">
                                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <FaCalendarAlt className="mb-0.5" /> {post.date}
                                            </div>
                                            <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                            <div className="flex items-center gap-1.5">
                                                <FaComments className="mb-0.5" /> {post.comments} Comments
                                            </div>
                                        </div>

                                        <h2 className="text-2xl font-black text-gray-900 uppercase leading-tight mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                                            {post.summary}
                                        </p>

                                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                                                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-black text-[10px]">
                                                        {post.author.charAt(0)}
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                                                    {post.author}
                                                </span>
                                            </div>
                                            <button className="text-black group-hover:translate-x-2 transition-transform duration-300">
                                                <FaArrowRight className="text-xs" />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </main>
        </div>
    );
};

export default Blog;
