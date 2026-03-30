import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <div className="relative group">
                        <div className="relative h-[400px] lg:h-[500px] w-full z-10">
                            <img
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="About Us"
                                className="w-full h-full object-cover rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                        </div>
                        <div className="absolute top-10 -left-10 w-full h-full border-4 border-primary/20 rounded-lg -z-0 hidden md:block transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                    </div>

                    <div>
                        <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
                            About Us
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight text-gray-900">
                            We Provide High Quality <span className="text-primary">Shoes</span>
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed text-lg font-light">
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="border border-gray-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gray-50">
                                <h4 className="text-4xl font-black text-primary mb-2">20+</h4>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Years Experience</p>
                            </div>
                            <div className="border border-gray-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gray-50">
                                <h4 className="text-4xl font-black text-primary mb-2">50k+</h4>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Happy Customers</p>
                            </div>
                        </div>

                        <button className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                            Read More
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;