import React from 'react'
import { assets } from "../assets/assets_frontend/assets";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  return (
   <div className='relative rounded-3xl bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 shadow-2xl px-6 md:px-12 lg:px-20'>

  {/* Watch Demo Button - Bottom Right Corner */}
  <motion.button
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.8 }}
    onClick={() => navigate('/demo')}
    className='absolute bottom-6 right-6 z-30 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-3 py-1.5 rounded-full font-medium text-xs shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center gap-1.5'
  >
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    Demo
  </motion.button>

  {/* Background Floating Blobs */}
  <div className='absolute inset-0 overflow-hidden pointer-events-none'>
    <motion.div 
      animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className='absolute -top-32 -left-32 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl'
    />
    <motion.div 
      animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className='absolute bottom-10 -right-32 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl'
    />
  </div>

      {/* Main Content */}
      <div className='flex flex-col md:flex-row items-center justify-between relative z-10'>

        {/* Left Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='md:w-1/2 flex flex-col justify-center gap-6 py-16'
        >
          {/* Static Main Title */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-lg'>
            Book Your Appointments
          </h1>

          {/* Animated Changing Subtitles */}
          <h2 className='text-lg md:text-xl text-blue-100 font-light'>
            <TypeAnimation
              sequence={[
                "With Trusted Doctors",
                2000,
                "Anytime, Anywhere",
                2000,
                "Hassle-Free & Quick",
                2000,
                "Your Health, Our Priority",
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>

          {/* Description */}
          <div className='flex flex-col md:flex-row items-center gap-4 text-blue-100/90 text-sm'>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className='backdrop-blur-lg bg-white/10 p-3 rounded-full shadow-lg'
            >
              <img className='w-20' src={assets.group_profiles} alt="Doctors" />
            </motion.div>
            <p className='max-w-md'>
              Browse our extensive list of verified doctors and book your appointment in seconds.  
              No hassle, no waiting.
            </p>
          </div>

          {/* Button */}
          <motion.a 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            href='#speciality' 
            className='inline-flex items-center gap-3 bg-white text-blue-800 px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300'
          >
            Book Now 
            <img className='w-4' src={assets.arrow_icon} alt="arrow" />
          </motion.a>
        </motion.div>

        {/* Right Section - Natural Integration */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='md:w-1/2 relative flex justify-center md:justify-end items-end mt-12 md:mt-0'
        >
          {/* Header Image with Logo Overlay */}
          <div className='relative'>
            {/* Logo naturally positioned as a watermark/overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className='absolute -top-4 -right-4 z-20'
            >
              <div className='bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg'>
                <img 
                  className='w-16 h-auto' 
                  src={assets.logo} 
                  alt="DocSchedule" 
                />
              </div>
            </motion.div>

            {/* Main Header Image */}
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className='w-full max-w-lg drop-shadow-2xl rounded-3xl'
              src={assets.header_img} 
              alt="Header" 
            />
            
            {/* Glow Behind Image */}
            <div className='absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-400/30 to-transparent blur-2xl -z-10'></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Header
