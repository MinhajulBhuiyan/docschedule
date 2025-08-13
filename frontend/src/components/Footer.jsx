import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from "../assets/assets_frontend/assets";
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-100/50 to-white border-t border-blue-200/40">
      {/* Floating Blobs */}
      <motion.div 
        animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-20 w-60 h-60 bg-blue-300/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-24 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl"
      />

      {/* Main Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Logo & About */}
          <div className="lg:col-span-2">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20"></div>
              <img className="relative z-10 w-44" src={assets.logo} alt="Logo" />
            </div>
            <p className="text-gray-600 leading-relaxed text-base max-w-lg mb-6">
              Your trusted partner in healthcare. We connect you with top doctors, making healthcare easy, fast, and reliable — because your health is our priority.
            </p>

            {/* Quick Access Icons */}
            <div className="flex gap-4 flex-wrap">
              {[
                { icon: '📱', label: 'Mobile App' },
                { icon: '💬', label: 'Live Chat' },
                { icon: '📧', label: 'Email Support' },
                { icon: '🔒', label: 'Secure' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="flex flex-col items-center gap-2 p-3 bg-white/90 backdrop-blur rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 relative">
              Get In Touch
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </h3>
            <div className="space-y-4">
              {[
                { icon: '📞', title: 'Call Us', info: '+1-212-456-7890', gradient: 'from-blue-500 to-purple-500' },
                { icon: '✉️', title: 'Email Us', info: 'prescripto@gmail.com', gradient: 'from-purple-500 to-pink-500' },
                { icon: '📍', title: 'Visit Us', info: '24/7 Available', gradient: 'from-green-500 to-emerald-500' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 bg-white/90 backdrop-blur rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <p className="font-semibold text-gray-800">{item.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-600 text-center md:text-left">
            © 2024 Prescripto.com — All Rights Reserved. Making healthcare accessible for everyone.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-blue-600 transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-blue-600 transition-colors duration-200">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-blue-600 transition-colors duration-200">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
