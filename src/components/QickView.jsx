import React, { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FaStar, FaShoppingCart, FaHeart, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa"
import { ShopContext } from "../context/ShopContext"

const QuickView = () => {
  const { addToCart, addToWishlist } = useContext(ShopContext)
  const location = useLocation()
  const navigate = useNavigate()

  const product = location.state?.product

  const [selectedImage, setSelectedImage] = useState("")
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (product) {
      setSelectedImage(product.img)
      if (product.sizes?.uk?.length > 0) {
        setSelectedSize(product.sizes.uk[0])
      }
    }
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    )
  }

  const images = [product.img, ...(product.Images || [])]

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-gray-400 hover:text-black font-bold uppercase tracking-widest text-xs mb-12 transition-all group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Store
        </button>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          <div className="w-full lg:w-3/5 flex gap-6">

            <div className="flex flex-col gap-4 w-20 sm:w-24 flex-shrink-0">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-[4/5] rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 bg-gray-50 flex items-center justify-center p-2 ${selectedImage === img ? "border-primary shadow-lg scale-105" : "border-gray-100 hover:border-gray-300"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
              ))}
            </div>

            <div className="relative flex-1 bg-gray-50 rounded-[2.5rem] overflow-hidden flex items-center justify-center p-12 group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto max-h-[600px] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
              />

              <button
                onClick={() => addToWishlist({ ...product, size: selectedSize })}
                className="absolute top-8 right-8 w-14 h-14 bg-white shadow-2xl rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 transition-all hover:scale-110"
              >
                <FaHeart className="text-2xl" />
              </button>

              {product.sale && (
                <span className="absolute top-8 left-8 bg-black text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                  Sale
                </span>
              )}
            </div>

          </div>

          <div className="w-full lg:w-2/5 py-6">

            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tight mb-6 leading-none">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex text-yellow-400 text-lg">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-200"} />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 mb-10">
              <span className="text-4xl font-black text-gray-900">${product.price}</span>
              {product.oldPrice && (
                <span className="text-2xl text-gray-300 line-through">${product.oldPrice}</span>
              )}
            </div>

            {product.sizes?.uk && (
              <div className="mb-10">
                <div className="flex flex-wrap gap-3">
                  {product.sizes.uk.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-2xl border-2 font-black flex items-center justify-center ${selectedSize === size ? "bg-black text-white border-black" : "border-gray-100 text-gray-400 hover:border-gray-300 hover:text-black"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-10">
              <div className="flex items-center bg-gray-50 w-36 h-14 rounded-2xl px-4 justify-between border border-gray-100">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <FaMinus />
                </button>
                <span className="font-black text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <FaPlus />
                </button>
              </div>
            </div>

            <button
              onClick={() => addToCart({ ...product, size: selectedSize, quantity })}
              className="w-full bg-black text-white h-16 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:bg-primary hover:text-black transition-all"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickView