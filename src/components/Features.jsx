import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FaShippingFast, FaUndoAlt, FaMoneyCheckAlt, FaHeadset } from 'react-icons/fa';

import 'swiper/css';

const features = [
    {
        icon: <FaShippingFast />,
        title: 'Free Shipping',
        desc: 'Divided face for bearing the divide unto seed winged divided light Forth.',
    },
    {
        icon: <FaUndoAlt />,
        title: 'Always Fresh',
        desc: 'Divided face for bearing the divide unto seed winged divided light Forth.',
    },
    {
        icon: <FaMoneyCheckAlt />,
        title: 'Superior Quality',
        desc: 'Divided face for bearing the divide unto seed winged divided light Forth.',
    },
    {
        icon: <FaHeadset />,
        title: 'Support',
        desc: 'Divided face for bearing the divide unto seed winged divided light Forth.',
    },
    {
        icon: <FaShippingFast />,
        title: 'Secure Payment',
        desc: 'Encrypted transactions for your peace of mind and data security.',
    },
    {
        icon: <FaHeadset />,
        title: '24/7 Support',
        desc: 'Our dedicated team is here to help you anytime, anywhere.',
    }
];

const Features = () => {
    return (
        <section className="py-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    spaceBetween={30}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    className="pb-10"
                >
                    {features.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center text-center p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full group">
                                <div className="text-5xl text-primary mb-8 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-black mb-4 uppercase tracking-widest text-gray-900">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Features;
