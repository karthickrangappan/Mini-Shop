import { Link } from "react-router-dom";    
const collectionsData = [
    {
        id: 1,
        title: "Men's",
        subtitle: "COLLECTION",
        image: "/images/choose-1.jpg",
        alt: "Men Collection",
        link: "#mens-collection"
    },
    {
        id: 2,
        title: "Women's",
        subtitle: "COLLECTION",
        image: "/images/choose-2.jpg",
        alt: "Women Collection",
        link: "#womens-collection"
    }
];

const Collections = () => {
    return (
        <section className="py-12 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {collectionsData.map((collection) => (
                        <div
                            key={collection.id}
                            className="relative group overflow-hidden h-[400px] md:h-[500px] rounded-2xl shadow-xl cursor-pointer"
                        >
                            <img
                                src={collection.image}
                                alt={collection.alt}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-12">
                                <span className="text-primary text-sm md:text-base font-bold tracking-[0.3em] mb-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 uppercase">
                                    {collection.subtitle}
                                </span>
                                <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 drop-shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">
                                    {collection.title}
                                </h2>
                                <Link
                                    to={"/filtering"}
                                    className="relative overflow-hidden group/btn bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold px-10 py-3 rounded-full uppercase tracking-widest text-sm transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:border-primary"
                                >
                                     <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">Shop Now</span>
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover/btn:scale-100 group-hover/btn:bg-primary z-0"></div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Collections;
