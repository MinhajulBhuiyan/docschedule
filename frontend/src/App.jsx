import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Enhanced Components with Lazy Loading
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LoadingSpinner from './components/Common/LoadingSpinner'
import ErrorBoundary from './components/Common/ErrorBoundary'

// Lazy Loaded Pages for Better Performance
const Home = lazy(() => import('./pages/Home/Home'))
const Doctors = lazy(() => import('./pages/Doctors/Doctors'))
const Login = lazy(() => import('./pages/Auth/Login'))
const About = lazy(() => import('./pages/About/About'))
const Contact = lazy(() => import('./pages/Contact/Contact'))
const Appointment = lazy(() => import('./pages/Appointment/Appointment'))
const MyAppointments = lazy(() => import('./pages/Appointments/MyAppointments'))
const MyProfile = lazy(() => import('./pages/Profile/MyProfile'))
const Verify = lazy(() => import('./pages/Auth/Verify'))
const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/Legal/TermsOfService'))
const CookiePolicy = lazy(() => import('./pages/Legal/CookiePolicy'))

// Enhanced App Component with Better Structure
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Toast Notifications Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Main Application Container */}
      <div className="mx-4 sm:mx-[5%] lg:mx-[10%] xl:mx-[15%]">
        
        {/* Navigation Header */}
        <Navbar />

        {/* Main Content Area with Error Boundary */}
        <main className="min-h-[calc(100vh-200px)]">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Home Route */}
                <Route 
                  path="/" 
                  element={<Home />} 
                />

                {/* Doctors Routes */}
                <Route 
                  path="/doctors" 
                  element={<Doctors />} 
                />
                <Route 
                  path="/doctors/:speciality" 
                  element={<Doctors />} 
                />

                {/* Authentication Routes */}
                <Route 
                  path="/login" 
                  element={<Login />} 
                />
                <Route 
                  path="/verify" 
                  element={<Verify />} 
                />

                {/* Information Pages */}
                <Route 
                  path="/about" 
                  element={<About />} 
                />
                <Route 
                  path="/contact" 
                  element={<Contact />} 
                />

                {/* Appointment Management */}
                <Route 
                  path="/appointment/:docId" 
                  element={<Appointment />} 
                />
                <Route 
                  path="/my-appointments" 
                  element={<MyAppointments />} 
                />

                {/* User Profile */}
                <Route 
                  path="/my-profile" 
                  element={<MyProfile />} 
                />

                {/* Legal Pages */}
                <Route 
                  path="/privacy-policy" 
                  element={<PrivacyPolicy />} 
                />
                <Route 
                  path="/terms-of-service" 
                  element={<TermsOfService />} 
                />
                <Route 
                  path="/cookie-policy" 
                  element={<CookiePolicy />} 
                />

                {/* 404 Route - Catch All */}
                <Route 
                  path="*" 
                  element={
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                      <a 
                        href="/" 
                        className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                      >
                        Go Home
                      </a>
                    </div>
                  } 
                />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default App