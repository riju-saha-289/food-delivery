import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import Home from './pages/Home/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Cart from './pages/Cart/Cart'
import Footer from './component/Footer'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'

import { ToastContainer} from 'react-toastify';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess'
import MyOrder from './pages/MyOrders/MyOrder'
import ContactUs from './pages/Contact/ContactUs'
import Menu from './pages/Menu/Menu'
import MobileAppPage from './pages/Mobile-App/MobileAppPage'
// import Verify from './pages/Verify/Verify'
function App() {
  

  return (
    <Router>
      <Navbar></Navbar>
      <ToastContainer/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/order" element={ <PlaceOrder/>}/>
        <Route exact path="/paymentSuccess" element={ <PaymentSuccess/>}/>
        <Route exact path="/myorders" element={ <MyOrder/>}/>
        <Route exact path="/contact-us" element={ <ContactUs/>}/>
        <Route exact path="home" element={<Home/>}/>
        <Route exact path="menu" element={<Menu/>}/>
        <Route exact path="mobile-app" element={<MobileAppPage/>}/>
      </Routes>
      
      <Footer/>
    </Router>
  )
}

export default App
