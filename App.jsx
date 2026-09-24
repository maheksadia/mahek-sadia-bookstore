import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import AllBooks from './pages/AllBooks.jsx'
import BookDetails from './pages/BookDetails.jsx'
import AboutAuthor from './pages/AboutAuthor.jsx'
import Poetry from './pages/Poetry.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import MyOrders from './pages/MyOrders.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminBooks from './pages/admin/AdminBooks.jsx'
import AdminOrders from './pages/admin/AdminOrders.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/poetry" element={<Poetry />} />
          <Route path="/about" element={<AboutAuthor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<MyOrders />} />

          <Route path="/admin">
            <Route index element={<AdminLogin />} />
            <Route element={<AdminDashboard />}>
              <Route path="books" element={<AdminBooks />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
