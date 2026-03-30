const Testimonials = () => {
    return (
        <section className="py-24 bg-[#f8ca11]">
            <div className="max-w-7xl mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-4xl md:text-5xl font-black text-black uppercase mb-16 tracking-wider">
                    Our Satisfied Customer Says
                </h2>

                <div className="bg-white p-8 md:p-14 rounded-lg shadow-2xl relative mt-12 transition-transform hover:scale-[1.02] duration-300">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                            alt="Customer"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <p className="text-gray-600 text-lg md:text-xl italic mt-8 mb-8 font-light leading-relaxed">
                        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
                    </p>

                    <h4 className="font-bold text-xl uppercase tracking-widest text-black">Garreth Smith</h4>
                    <span className="text-gray-500 text-sm tracking-widest uppercase mt-1 block">Marketing Manager</span>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
