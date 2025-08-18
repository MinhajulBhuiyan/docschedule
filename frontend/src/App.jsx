<<<<<<< HEAD
import React from 'react'
import Navbar from './components/Navbar'
=======
import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
>>>>>>> b72aacb9d1a6992d597bc8d4d2a013e79ecd952f
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import Demo from './pages/Demo'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      
<<<<<<< HEAD
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content with top padding for fixed navbar */}
      <main className="pt-24">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-of-service' element={<TermsOfService />} />
          <Route path='/cookie-policy' element={<CookiePolicy />} />
          <Route path='/demo' element={<Demo />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <Footer />
=======
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-72'}`}>
        <div className="min-h-screen flex flex-col">
          {/* Main Content without top navbar padding */}
          <main className="flex-1 p-4 md:p-6">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/doctors' element={<Doctors />} />
              <Route path='/doctors/:speciality' element={<Doctors />} />
              <Route path='/login' element={<Login />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/appointment/:docId' element={<Appointment />} />
              <Route path='/my-appointments' element={<MyAppointments />} />
              <Route path='/my-profile' element={<MyProfile />} />
              <Route path='/verify' element={<Verify />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/terms-of-service' element={<TermsOfService />} />
              <Route path='/cookie-policy' element={<CookiePolicy />} />
              <Route path='/demo' element={<Demo />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
>>>>>>> b72aacb9d1a6992d597bc8d4d2a013e79ecd952f
    </div>
  )
}

export default App