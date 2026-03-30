import React, { useState, useContext, useMemo, useEffect } from 'react';
import { products, categories, categoryOffers, productOffers } from "../data/products";
import { ShopContext } from "../context/ShopContext";
import {
    Star,
    LayoutGrid,
    List,
    Filter,
    X,
    Heart,
    ShoppingBag,
    Eye,
    ChevronRight,
    SlidersHorizontal,
    Search,
    RotateCcw
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

import toast from 'react-hot-toast';

const Filtering = () => {
    const navigate = useNavigate();
    const { addToCart, addToWishlist } = useContext(ShopContext);

    const [priceRange, setPriceRange] = useState(500);
    const [selectedRating, setSelectedRating] = useState('all');
    const [selectedOffer, setSelectedOffer] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [viewType, setViewType] = useState('grid');
    const [showSidebar, setShowSidebar] = useState(false);
    const [selectedProductOffer, setSelectedProductOffer] = useState('all');
    const [selectedSizeFilter, setSelectedSizeFilter] = useState('all');
    const [selectedSizes, setSelectedSizes] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = useMemo(() => {
        let result = [...products];
        if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory);
        if (searchQuery) {
            result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }


        if (priceRange === 'under-100') result = result.filter(p => p.price < 100);
        else if (priceRange === '100-150') result = result.filter(p => p.price >= 100 && p.price <= 150);
        else if (priceRange === '150-200') result = result.filter(p => p.price > 150 && p.price <= 200);
        else if (priceRange === 'above-200') result = result.filter(p => p.price > 200);

        if (selectedRating !== 'all') result = result.filter(p => p.rating >= parseFloat(selectedRating));
        if (selectedOffer !== 'all') result = result.filter(p => p.discount >= parseInt(selectedOffer));
        if (selectedProductOffer !== 'all') result = result.filter(p => p.productOffer === selectedProductOffer);
        if (selectedSizeFilter !== 'all') result = result.filter(p => p.sizes.uk.includes(parseInt(selectedSizeFilter)));

        if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
        else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

        return result;
    }, [selectedCategory, priceRange, selectedRating, selectedOffer, sortBy, searchQuery, selectedProductOffer, selectedSizeFilter]);

    const resetAll = () => {
        setPriceRange('all');
        setSelectedRating('all');
        setSelectedOffer('all');
        setSelectedCategory('all');
        setSortBy('default');
        setSearchQuery('');
        setSelectedProductOffer('all');
        setSelectedSizeFilter('all');
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setShowSidebar(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div className="min-h-screen bg-[#FBFBFB] font-sans selection:bg-[#c9a84c]/20">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16">

                <header className="mb-12 md:mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

                        <div>
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#c9a84c] mb-2 block">
                                Exquisite Selection
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-[#121212] tracking-tighter leading-tight italic">
                                The Collection
                            </h1>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="relative group min-w-[300px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c9a84c] transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search your desire..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border border-gray-100 py-4 pl-12 pr-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-8 lg:items-start">

                    <div className="lg:hidden flex items-center justify-between mb-4">
                        <button
                            onClick={() => setShowSidebar(true)}
                            className="bg-[#121212] text-white px-6 py-3 rounded-full flex items-center gap-3 text-sm font-bold tracking-wider hover:bg-[#c9a84c] transition-colors shadow-lg"
                        >
                            <SlidersHorizontal size={16} /> FILTERS
                        </button>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">{filteredProducts.length}</span>
                        </div>
                    </div>

                    {showSidebar && (
                        <div
                            onClick={() => setShowSidebar(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden"
                        />
                    )}

                    <aside className={`
                        fixed top-0 left-0 h-full w-[320px] bg-[#121212] z-[101] p-8 overflow-y-auto transition-transform duration-500 ease-out
                        lg:sticky lg:top-24 lg:w-[280px] lg:h-auto lg:p-0 lg:bg-transparent lg:z-10 lg:translate-x-0
                        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
                    `}>
                        <div className="flex lg:hidden items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-white italic tracking-tighter">REFINE</h2>
                            <button onClick={() => setShowSidebar(false)} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-10">
                            <section>
                                <label className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-6 lg:text-gray-500">
                                    Price Range <div className="h-[1px] flex-1 bg-gray-800 lg:bg-gray-200" />
                                </label>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { id: 'all', label: 'All Prices' },
                                        { id: 'under-100', label: 'Under ₹100' },
                                        { id: '100-150', label: '₹100 - ₹150' },
                                        { id: '150-200', label: '₹150 - ₹200' },
                                        { id: 'above-200', label: 'Above ₹200' }
                                    ].map(range => (
                                        <button
                                            key={range.id}
                                            onClick={() => setPriceRange(range.id)}
                                            className={`
                                                flex items-center justify-between px-4 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all border
                                                ${priceRange === range.id
                                                    ? 'bg-[#c9a84c] border-[#c9a84c] text-[#121212] shadow-lg shadow-[#c9a84c]/20'
                                                    : 'bg-transparent border-gray-800 lg:border-gray-100 text-gray-500 hover:border-gray-500 lg:hover:border-gray-300'}
                                            `}
                                        >
                                            {range.label}
                                            {priceRange === range.id && <span className="w-1.5 h-1.5 bg-[#121212] rounded-full" />}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <label className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-6 lg:text-gray-500">
                                    Colletion <div className="h-[1px] flex-1 bg-gray-800 lg:bg-gray-200" />
                                </label>
                                <div className="flex flex-col gap-1.5">
                                    {categories.map(cat => {
                                        const catOffer = categoryOffers.find(o => o.category === cat);
                                        return (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`
                                                    flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300
                                                    ${selectedCategory === cat
                                                        ? 'bg-[#c9a84c] text-[#121212] shadow-lg shadow-[#c9a84c]/20'
                                                        : 'text-gray-500 hover:text-white lg:hover:text-[#121212] hover:bg-white/5 lg:hover:bg-gray-100'}
                                                `}
                                            >
                                                <div className="flex flex-col items-start gap-1">
                                                    <span>{cat === 'all' ? 'Everything' : cat}</span>
                                                    {catOffer && <span className="text-[8px] opacity-60 italic">{catOffer.offer}</span>}
                                                </div>
                                                {selectedCategory === cat && <ChevronRight size={14} />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>


                            <section>
                                <label className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-6 lg:text-gray-500">
                                    Min Rating <div className="h-[1px] flex-1 bg-gray-800 lg:bg-gray-200" />
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['all', '4', '3', '2'].map(rate => (
                                        <button
                                            key={rate}
                                            onClick={() => setSelectedRating(rate)}
                                            className={`
                                                px-3 py-3 rounded-lg text-[10px] font-bold tracking-widest uppercase border transition-all
                                                ${selectedRating === rate
                                                    ? 'bg-[#c9a84c] border-[#c9a84c] text-[#121212]'
                                                    : 'bg-transparent border-gray-800 lg:border-gray-100 text-gray-500 hover:border-gray-600 lg:hover:border-gray-300'}
                                            `}
                                        >
                                            {rate === 'all' ? 'Any' : `${rate}★+`}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <label className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-6 lg:text-gray-500">
                                    Product Wise Offers <div className="h-[1px] flex-1 bg-gray-800 lg:bg-gray-200" />
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {productOffers.map(offer => (
                                        <button
                                            key={offer}
                                            onClick={() => setSelectedProductOffer(offer)}
                                            className={`
                                                px-4 py-2 rounded-full text-[9px] font-bold tracking-widest uppercase transition-all border
                                                ${selectedProductOffer === offer
                                                    ? 'bg-[#c9a84c] border-[#c9a84c] text-[#121212]'
                                                    : 'bg-transparent border-gray-800 lg:border-gray-100 text-gray-500 hover:border-gray-500 lg:hover:border-gray-300'}
                                            `}
                                        >
                                            {offer === 'all' ? 'Default' : offer}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <label className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-6 lg:text-gray-500">
                                    Size Range (UK) <div className="h-[1px] flex-1 bg-gray-800 lg:bg-gray-200" />
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['all', '5', '6', '7', '8', '9', '10', '11'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSizeFilter(size)}
                                            className={`
                                                aspect-square flex items-center justify-center rounded-lg text-[10px] font-bold tracking-widest uppercase border transition-all
                                                ${selectedSizeFilter === size
                                                    ? 'bg-[#c9a84c] border-[#c9a84c] text-[#121212]'
                                                    : 'bg-transparent border-gray-800 lg:border-gray-100 text-gray-500 hover:border-gray-600 lg:hover:border-gray-300'}
                                            `}
                                        >
                                            {size === 'all' ? 'Any' : size}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <label className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-6 lg:text-gray-500">
                                    Discount % <div className="h-[1px] flex-1 bg-gray-800 lg:bg-gray-200" />
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {['all', '10', '20', '30', '50'].map(offer => (
                                        <button
                                            key={offer}
                                            onClick={() => setSelectedOffer(offer)}
                                            className={`
                                                px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase transition-all border
                                                ${selectedOffer === offer
                                                    ? 'bg-[#c9a84c] border-[#c9a84c] text-[#121212]'
                                                    : 'bg-transparent border-gray-800 lg:border-gray-100 text-gray-500 hover:border-gray-500 lg:hover:border-gray-300'}
                                            `}
                                        >
                                            {offer === 'all' ? 'All' : `${offer}%+`}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <button
                                onClick={resetAll}
                                className="w-full mt-6 py-4 rounded-xl border border-dashed border-gray-700 lg:border-gray-200 text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:bg-white/5 lg:hover:bg-gray-50 transition-all cursor-pointer group"
                            >
                                <RotateCcw size={14} className="group-hover:rotate-[-90deg] transition-transform duration-500" />
                                Clear Filters
                            </button>
                        </div>
                    </aside>

                    <main className="flex-1 min-w-0">
                        <div className="bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="hidden lg:flex items-center gap-4">
                                <div className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 rounded-full border border-gray-100">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <p className="text-xs font-bold text-gray-600 tracking-widest flex items-center gap-2">
                                        <span className="text-[#121212] text-sm tabular-nums">{filteredProducts.length}</span>
                                        PRODUCTS FOUND
                                    </p>
                                </div>

                                {selectedCategory !== 'all' && (
                                    <button
                                        onClick={() => setSelectedCategory('all')}
                                        className="bg-[#121212] text-white pl-4 pr-3 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-[#c9a84c] transition-colors"
                                    >
                                        {selectedCategory} <X size={12} />
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 md:gap-6 self-end md:self-auto">
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={e => setSortBy(e.target.value)}
                                        className="bg-gray-50 border border-gray-100 rounded-full px-6 py-3 text-xs font-bold tracking-widest uppercase text-gray-700 outline-none focus:ring-2 focus:ring-[#c9a84c]/20 cursor-pointer appearance-none pr-12 min-w-[180px]"
                                    >
                                        <option value="default">Sort: Recommended</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Top Rated Only</option>
                                    </select>
                                    <ChevronRight size={14} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                                </div>

                                <div className="flex bg-gray-50 p-1 rounded-full border border-gray-100">
                                    <button
                                        onClick={() => setViewType('grid')}
                                        className={`p-2.5 rounded-full transition-all ${viewType === 'grid' ? 'bg-[#121212] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <LayoutGrid size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewType('list')}
                                        className={`p-2.5 rounded-full transition-all ${viewType === 'list' ? 'bg-[#121212] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div
                                className={`
                                    grid gap-6 md:gap-8
                                    ${viewType === 'grid'
                                        ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                                        : 'grid-cols-1'}
                                `}
                            >
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        viewType={viewType}
                                        navigate={navigate}
                                        addToCart={addToCart}
                                        addToWishlist={addToWishlist}
                                        selectedSize={selectedSizes[product.id]}
                                        setSelectedSize={(size) => setSelectedSizes(prev => ({ ...prev, [product.id]: size }))}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 px-10 text-center glass-card rounded-[3rem] border-dashed border-2 border-gray-200">

                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 relative">
                                    <Search size={40} className="text-gray-200" />
                                    <X size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#c9a84c] opacity-50" />
                                </div>
                                <h3 className="text-3xl font-black text-[#121212] tracking-tighter italic mb-4">No Match Found</h3>
                                <p className="text-gray-400 max-w-[340px] text-sm leading-relaxed mb-10 font-medium">
                                    Your quest for the perfect pair continues. Try widening your criteria or clearing all filters.
                                </p>
                                <button
                                    onClick={resetAll}
                                    className="bg-[#121212] text-white px-10 py-4 rounded-2xl text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#c9a84c] hover:text-[#121212] transition-all duration-500 shadow-xl shadow-gray-200"
                                >
                                    Start Fresh
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product, viewType, navigate, addToCart, addToWishlist, selectedSize, setSelectedSize }) => {
    const isGrid = viewType === 'grid';

    return (
        <div
            className={`
                group relative bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500
                ${!isGrid ? 'flex flex-col md:flex-row' : ''}
            `}
        >
            <div className={`
                relative bg-[#f8f8f8] flex items-center justify-center overflow-hidden
                ${isGrid ? 'aspect-[1/1.1] p-10' : 'w-full md:w-[320px] h-[320px] p-12 flex-shrink-0'}
            `}>
                <img
                    src={product.img}
                    alt={product.name}
                    loading="lazy"
                    onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                    className="w-full h-full object-contain mix-blend-multiply cursor-pointer group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {product.sale && (
                    <span className="absolute top-6 left-6 bg-[#121212] text-[#c9a84c] text-[10px] font-black tracking-[0.2em] uppercase py-2 px-4 rounded-full z-10 shadow-lg">
                        COLLECTORS SALE
                    </span>
                )}

                {product.productOffer && (
                    <span className="absolute top-6 right-6 bg-[#c9a84c] text-[#121212] text-[8px] font-black tracking-[0.2em] uppercase py-1.5 px-3 rounded-md z-10 shadow-lg italic">
                        {product.productOffer}
                    </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 flex justify-center gap-3">
                    <button
                        onClick={() => {
                            if (!selectedSize) {
                                toast.error("Please select a size first");
                                return;
                            }
                            addToWishlist(product);
                        }}
                        className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-[#121212] hover:text-white transition-all scale-90 group-hover:scale-100 duration-500 delay-[50ms]"
                    >
                        <Heart size={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                        className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-[#121212] hover:text-white transition-all scale-90 group-hover:scale-100 duration-500 delay-[100ms]"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        onClick={() => {
                            if (!selectedSize) {
                                toast.error("Please select a size first");
                                return;
                            }
                            addToCart({ ...product, size: selectedSize });
                        }}
                        className="flex-1 bg-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-[#c9a84c] hover:text-[#121212] font-black text-[10px] tracking-widest transition-all scale-90 group-hover:scale-100 duration-500 delay-[150ms]"
                    >
                        <ShoppingBag size={18} className="mr-2" /> Add to Cart
                    </button>
                </div>
            </div>

            <div className={`
                p-8 flex flex-col
                ${!isGrid ? 'flex-1 justify-center' : ''}
            `}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#c9a84c] italic">
                            {product.category}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star size={10} className="fill-[#f0b429] text-[#f0b429]" />
                        <span className="text-[10px] font-bold text-gray-400">{product.rating.toFixed(1)}</span>
                    </div>
                </div>

                <h3
                    onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                    className="text-xl font-bold text-[#121212] tracking-tight leading-none mb-4 cursor-pointer hover:text-[#c9a84c] transition-colors line-clamp-2"
                >
                    {product.name}
                </h3>

                {!isGrid && (
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed line-clamp-3 max-w-[500px]">
                        A masterpiece of design and performance. The {product.name} combines heritage craftsmanship with modern silhouettes for an unparalleled footwear experience.
                    </p>
                )}

                <div className="flex items-end gap-3 mb-8">
                    <span className="text-3xl font-black text-[#121212] tracking-tighter italic">₹{product.price}</span>
                    {product.oldPrice && (
                        <span className="text-sm text-gray-300 line-through font-bold pb-1">₹{product.oldPrice}</span>
                    )}
                </div>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-gray-300">Available UK Size</span>
                        {selectedSize && <span className="text-[10px] font-black text-[#c9a84c]">SELECTED: {selectedSize}</span>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes.uk.map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`
                                    w-10 h-10 rounded-xl text-[10px] font-black transition-all border
                                    ${selectedSize === size
                                        ? 'bg-[#121212] text-white border-[#121212] shadow-lg shadow-gray-300'
                                        : 'bg-transparent border-gray-100 text-gray-400 hover:border-gray-200 hover:text-gray-900'}
                                `}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {!isGrid && (
                    <div className="mt-10 flex gap-4">
                        <button
                            className="bg-[#121212] text-white px-8 py-4 rounded-xl text-xs font-black tracking-widest uppercase hover:bg-[#c9a84c] hover:text-[#121212] transition-all flex items-center gap-3 shadow-xl"
                            onClick={() => {
                                if (!selectedSize) {
                                    toast.error("Please select a size first");
                                    return;
                                }
                                addToCart({ ...product, size: selectedSize });
                            }}
                        >
                            <ShoppingBag size={16} /> Add to Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filtering;