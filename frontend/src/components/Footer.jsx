import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from "../assets/assets_frontend/assets";
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <div className='relative overflow-hidden'>
      {/* Background with floating elements */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50'></div>
      <motion.div 
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className='absolute top-0 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl'
      />
      <motion.div 
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className='absolute bottom-0 right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl'
      />
      <motion.div 
        animate={{ y: [0, 15, 0], x: [0, 8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className='absolute top-1/2 left-1/3 w-48 h-48 bg-indigo-200/15 rounded-full blur-2xl'
      />

      <div className='relative z-10 md:mx-10'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-20 mt-32'>
          
          {/* Company Info Section */}
          <div className='lg:col-span-2'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className='relative mb-6'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20'></div>
                <img className='relative z-10 w-44' src={assets.logo} alt="Logo" />
              </div>
              <p className='text-gray-600 leading-relaxed text-base max-w-lg mb-6'>
                Your trusted partner in healthcare. We connect you with the best medical professionals, 
                making quality healthcare accessible, convenient, and personalized for everyone.
              </p>
              
              {/* Social Media Icons */}
              <div className='flex gap-4'>
                {[
                  { icon: '📱', label: 'Mobile App' },
                  { icon: '💬', label: 'Live Chat' },
                  { icon: '📧', label: 'Email Support' },
                  { icon: '🔒', label: 'Secure' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className='flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'
                  >
                    <span className='text-2xl'>{item.icon}</span>
                    <span className='text-xs text-gray-600 font-medium'>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>



          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className='text-xl font-bold text-gray-800 mb-6 relative'>
              Get In Touch
              <div className='absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full'></div>
            </h3>
            <div className='space-y-4'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className='flex items-center gap-3 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100'
              >
                <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-lg'>📞</span>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Call Us</p>
                  <p className='font-semibold text-gray-800'>+1-212-456-7890</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className='flex items-center gap-3 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100'
              >
                <div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-lg'>✉️</span>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Email Us</p>
                  <p className='font-semibold text-gray-800'>prescripto@gmail.com</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className='flex items-center gap-3 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100'
              >
                <div className='w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-lg'>📍</span>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Visit Us</p>
                  <p className='font-semibold text-gray-800'>24/7 Available</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-gray-200 pt-8 pb-12'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='text-gray-600 text-center md:text-left'
            >
              © 2024 Prescripto.com - All Rights Reserved. Making healthcare accessible for everyone.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className='flex gap-6 text-sm text-gray-500'
            >
              <Link to="/privacy-policy" className='hover:text-blue-600 cursor-pointer transition-colors duration-200'>Privacy Policy</Link>
              <Link to="/terms-of-service" className='hover:text-blue-600 cursor-pointer transition-colors duration-200'>Terms of Service</Link>
              <Link to="/cookie-policy" className='hover:text-blue-600 cursor-pointer transition-colors duration-200'>Cookie Policy</Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
