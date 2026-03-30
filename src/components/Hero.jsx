import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

const heroData = [
    {
        id: 1,
        title: "Catch Your Own",
        highlight: "Stylish",
        subtitle: "& Look",
        collection: "Shoes Collection 2026",
        description: "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country.",
        buttonText: "Discover Now",
        image: "/images/bg_1.png",
        bgColor: "bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef]"
    },
    {
        id: 2,
        title: "A Stunning Range",
        highlight: "Winter",
        subtitle: "Collection",
        collection: "New Arrival 2026",
        description: "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country.",
        buttonText: "Shop Now",
        image: "/images/bg_2.png",
        bgColor: "bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb]"
    }
];

const Hero = () => {
    return (
        <div className="relative group/hero">
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                speed={1200}
                className="w-full h-[700px] md:h-[80vh] min-h-[600px] xl:min-h-[750px]"
            >
                {heroData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className={`relative ${slide.bgColor} flex flex-col md:flex-row items-center h-full w-full overflow-hidden`}>

                            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/50 blur-3xl"></div>
                            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-3xl z-0"></div>

                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full h-full flex flex-col md:flex-row items-center z-10">

                                <div className="absolute right-0 bottom-0 w-full h-[55%] md:h-full md:w-[60%] flex items-end justify-center md:justify-end z-0">
                                    <img
                                        src={slide.image}
                                        alt={slide.collection}
                                        className="h-full w-auto max-w-none md:w-full md:max-w-full object-contain object-bottom mb-[-20px] md:mb-0 scale-90 md:scale-100 xl:scale-110 transform transition-transform duration-[15s] ease-out hover:scale-[1.15]"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-t from-gray-100/30 to-transparent"></div>
                                </div>

                                <div className="w-full md:w-1/2 text-center md:text-left z-20 flex flex-col justify-center h-[45%] md:h-full pt-10 md:pt-0">
                                    <p className="font-bold tracking-[0.3em] uppercase mb-3 md:mb-4 text-xs sm:text-sm inline-block">
                                        <span className="text-primary bg-white/80 md:bg-primary/10 px-4 py-1.5 rounded-full backdrop-blur-sm">{slide.collection}</span>
                                    </p>
                                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-4 md:mb-6 uppercase tracking-wider drop-shadow-sm md:drop-shadow-none">
                                        {slide.title} <br className="hidden md:block" />
                                        <span className="text-primary">{slide.highlight}</span> {slide.subtitle}
                                    </h1>
                                    <p className="text-gray-700 md:text-gray-600 text-sm sm:text-base lg:text-lg mb-6 md:mb-8 max-w-md mx-auto md:mx-0 leading-relaxed font-medium md:font-light">
                                        {slide.description}
                                    </p>

                                    <div className="flex justify-center md:justify-start">
                                        <button className="relative overflow-hidden group/btn bg-gray-900 text-white font-bold uppercase tracking-widest text-xs sm:text-sm py-3 px-8 md:py-4 md:px-10 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                            <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                                                {slide.buttonText}
                                            </span>
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover/btn:scale-100 group-hover/btn:bg-primary z-0"></div>
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;
