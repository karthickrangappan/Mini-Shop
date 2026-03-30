import im1 from "../../public/images/sheo/sheo (1).png"
import img2 from "../../public/images/product-1.png"
import img3 from "../../public/images/product-2.png"
import img4 from "../../public/images/product-3.png"
import img5 from "../../public/images/product-4.png"
import img6 from "../../public/images/product-5.png"
import img7 from "../../public/images/product-6.png"
import img8 from "../../public/images/product-7.png"

import img9 from "../../public/images/sheo/sheo (2).png"
import img10 from "../../public/images/sheo/sheo (3).png"
import img11 from "../../public/images/sheo/sheo (4).png"

import img12 from "../../public/images/casual1/casual1 (1).png"
import img13 from "../../public/images/casual1/casual1 (2).png"
import img14 from "../../public/images/casual1/casual1 (3).png"
import img15 from "../../public/images/casual1/casual1 (4).png"
import img16 from "../../public/images/casual1/casual1 (5).png"

import img17 from "../../public/images/casual3/casual3 (1).png"
import img18 from "../../public/images/casual3/casual3 (2).png"
import img19 from "../../public/images/casual3/casual3 (3).png"
import img20 from "../../public/images/casual3/casual3 (4).png"
import img21 from "../../public/images/casual3/casual3 (5).png"

import img22 from "../../public/images/premium/premium (1).png"
import img23 from "../../public/images/premium/premium (2).png"
import img26 from "../../public/images/premium/premium (5).png"

import img27 from "../../public/images/heels/heels (1).png"
import img28 from "../../public/images/heels/heels (2).png"
import img29 from "../../public/images/heels/heels (3).png"
import img30 from "../../public/images/heels/heels (4).png"

import img31 from "../../public/images/formal/formal (1).png"
import img32 from "../../public/images/formal/formal (2).png"
import img33 from "../../public/images/formal/formal (3).png"
import img34 from "../../public/images/formal/formal (4).png"
import img35 from "../../public/images/formal/formal (5).png"
import img36 from "../../public/images/formal/formal (6).png"


import img37 from "../../public/images/casual5/casual5 (1).png"
import img38 from "../../public/images/casual5/casual5 (2).png"
import img39 from "../../public/images/casual5/casual5 (3).png"
import img40 from "../../public/images/casual5/casual5 (4).png"

import img41 from "../../public/images/casual6/casual6 (1).png"
import img42 from "../../public/images/casual6/casual6 (2).png"
import img43 from "../../public/images/casual6/casual6 (3).png"
import img44 from "../../public/images/casual6/casual6 (4).png"

export const products = [
    {
        id: 1,
        name: "Nike Free RN 2019 iD",
        category: "casual",
        price: 120,
        oldPrice: 150,
        sale: false,
        rating: 4.5,
        discount: 20,
        productOffer: "10% Off",
        sizes: { uk: [6, 7, 8, 9, 10] },
        img: im1,
        Images: [img9, img10, img11]
    },
    {
        id: 2,
        name: "Premium Edition Shoe",
        category: "premium",
        price: 80,
        oldPrice: 120,
        sale: true,
        rating: 4.2,
        discount: 33,
        productOffer: "20% Off",
        sizes: { uk: [5, 6, 7, 8] },
        img: img2,
        Images: [img22, img26, img23]
    },
    {
        id: 3,
        name: "Formal Leather Shoe",
        category: "formal",
        price: 140,
        oldPrice: 180,
        sale: false,
        rating: 4.8,
        discount: 22,
        productOffer: "30% Off",
        sizes: { uk: [6, 7, 8, 9] },
        img: img3,
        Images: [img12, img13, img14, img15, img16]
    },
    {
        id: 4,
        name: "Elegant Heels",
        category: "formal",
        price: 150,
        oldPrice: 200,
        sale: false,
        rating: 4.3,
        discount: 25,
        sizes: { uk: [5, 6, 7] },
        img: img31,
        Images: [img32, img33, img34, img35, img36]
    },
    {
        id: 5,
        name: "Winter Casual Shoe",
        category: "casual",
        price: 120,
        oldPrice: 160,
        sale: false,
        rating: 4.6,
        discount: 25,
        sizes: { uk: [6, 7, 8] },
        img: img5,
        Images: [img17, img18, img19, img20, img21]
    },
    {
        id: 6,
        name: "Luxury Premium Shoe",
        category: "heels",
        price: 120,
        oldPrice: 160,
        sale: true,
        rating: 2.3,
        discount: 25,
        sizes: { uk: [6, 7, 8] },
        img: img6,
        Images: [img41, img42, img43, img44]
    },
    {
        id: 7,
        name: "Classic Formal Shoe",
        category: "casual",
        price: 110,
        oldPrice: 150,
        sale: false,
        rating: 3.0,
        discount: 26,
        sizes: { uk: [7, 8, 9] },
        img: img7,
        Images: [img37, img38, img40, img39]
    },
    {
        id: 8,
        name: "Modern Casual Sneaker",
        category: "heels",
        price: 120,
        oldPrice: 160,
        sale: false,
        rating: 3.7,
        discount: 25,
        sizes: { uk: [6, 7, 8, 9, 10] },
        img: img30,
        Images: [img27, img28, img29, img8]
    },
]

export const categories = ["all", "formal", "casual", "heels", "premium"]

export const categoryOffers = [
    { category: "formal", offer: "Buy 1 Get 1", discount: 50 },
    { category: "casual", offer: "Flat 30% OFF", discount: 30 },
    { category: "heels", offer: "Up to 50% OFF", discount: 50 },
    { category: "premium", offer: "Special 20% OFF", discount: 20 }
]

export const productOffers = ["all", "10% Off", "20% Off", "30% Off", "50% Off"]
