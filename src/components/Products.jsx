import { useState, useContext } from "react"
import { FaShoppingCart, FaHeart, FaEye, FaStar } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { ShopContext } from "../context/ShopContext"
import { products, categories, categoryOffers } from "../data/products"

const Products = () => {
  const navigate = useNavigate()
  const { addToCart, addToWishlist } = useContext(ShopContext)
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedSizes, setSelectedSizes] = useState({})

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex md:justify-center gap-3 md:gap-6 mb-12 overflow-x-auto no-scrollbar scroll-smooth px-4 md:px-0 md:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`uppercase rounded-full text-xs md:text-sm border-gray-200 font-bold tracking-wide px-5 py-2.5 md:px-6 md:py-2 transition whitespace-nowrap relative ${activeCategory === cat
                ? "bg-black text-white shadow-lg"
                : "bg-white border hover:bg-black hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col items-center text-center bg-white border border-gray-100 rounded-2xl  overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-full h-[300px] overflow-hidden bg-gray-100 flex items-center justify-center p-6">
                <img
                  onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                  src={product.img}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 hover:cursor-pointer"
                />

                {product.productOffer && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#121212] text-[#c9a84c] text-[8px] font-black tracking-widest uppercase py-1 px-2.5 rounded-sm shadow-md italic">
                      {product.productOffer}
                    </span>
                  </div>
                )}



                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <button
                    onClick={() => addToWishlist(product)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-900 hover:bg-[#c9a84c] hover:text-white transition-all transform hover:scale-110"
                    title="Add to Wishlist"
                  >
                    <FaHeart size={16} />
                  </button>
                </div>

                <div className="absolute top-16 right-4 z-20 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <button
                    onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-900 hover:bg-[#c9a84c] hover:text-white transition-all transform hover:scale-110"
                    title="Quick View"
                  >
                    <FaEye size={16} />
                  </button>
                </div>

                <div className="absolute bottom-4 inset-x-0 px-6 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <button
                    onClick={() => addToCart({ ...product, size: selectedSizes[product.id] })}
                    className="w-full bg-white/95 backdrop-blur-sm text-gray-900 py-3 rounded-full flex items-center justify-center gap-2 font-black text-[10px] tracking-[0.2em] uppercase shadow-xl hover:bg-[#121212] hover:text-white transition-all border border-gray-100"
                  >
                    <FaShoppingCart size={14} /> Add To Cart
                  </button>
                </div>
              </div>

              <div className="p-6 w-full">
                <h3
                  onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                  className="text-lg font-medium mb-2 hover:cursor-pointer text-gray-800 uppercase tracking-wide">
                  {product.name}
                </h3>

                <div className="flex justify-center mb-2 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <div className="text-primary font-bold text-lg flex gap-3 justify-center items-center mb-3">
                  {product.sale && (
                    <span className="text-gray-400 line-through text-sm font-normal">
                      ₹{product.oldPrice}
                    </span>
                  )}
                  <span className="text-gray-900">
                    ₹{product.price}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    Available Sizes (UK)
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {product.sizes.uk.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: size }))}
                        className={`px-2 py-1 border hover:cursor-pointer text-xs rounded transition ${selectedSizes[product.id] === size
                          ? "bg-black text-white border-black"
                          : "border-gray-200 text-gray-700 hover:bg-black hover:text-white"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Products