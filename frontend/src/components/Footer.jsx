import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Logo & About */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img className="w-40 h-auto" src={assets.logo} alt="DocSchedule" />
            </div>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
              Your trusted partner in healthcare. We connect you with top doctors, making healthcare easy, fast, and reliable — because your health is our priority.
            </p>

            {/* Quick Access */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Mobile App</span>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Live Chat</span>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Email Support</span>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Secure</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Us</p>
                  <p className="font-semibold text-gray-800">+1-234-567-890</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Us</p>
                  <p className="font-semibold text-gray-800">docschedule@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visit Us</p>
                  <p className="font-semibold text-gray-800">24/7 Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-center md:text-left">
            © 2024 Docschedule.com - All Rights Reserved. Making healthcare accessible for everyone.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-gray-500 hover:text-blue-600 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
