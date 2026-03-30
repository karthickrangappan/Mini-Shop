import Topbar from './components/Topbar'
import Navbar from './components/Navbar'
import Products from './components/Products'
import Blog from './components/Blog'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import About from './components/About'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import QickView from './components/QickView'
import Login from './components/Login'
import Register from './components/Register'
import { Toaster } from 'react-hot-toast'
import Private from "./private/private"
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import Checkout from './components/Checkout'
import Contact from './components/Contact'
import Pageheader from './pages/Pageheader'
import Filtering from './pages/Filtering'

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right' reverseOrder={false} toastOptions={{ duration: 3000 }} containerStyle={{ top: 80 }} />
      <div className="font-sans min-h-screen bg-white flex flex-col">
        <Topbar />
        <Navbar />
        <Pageheader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/filtering" element={<Filtering />} />
          <Route path="/cart" element={<Private><Cart /></Private>} />
          <Route path="/wishlist" element={<Private><Wishlist /></Private>} />
          <Route path="/checkout" element={<Private><Checkout /></Private>} />
          <Route path="/profile" element={<Private><Profile /></Private>} />
          <Route path="/orders" element={<Private><Orders /></Private>} />
          <Route path="/product/:id" element={<QickView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
