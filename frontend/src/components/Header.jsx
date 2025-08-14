import React from 'react'
import { assets } from "../assets/assets_frontend/assets";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

const Header = () => {
  return (
   <div className='relative rounded-3xl bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 shadow-2xl px-6 md:px-12 lg:px-20'>

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

        {/* Right Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='md:w-1/2 relative flex justify-center md:justify-end items-end mt-12 md:mt-0'
        >
          <motion.img 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className='w-full max-w-lg drop-shadow-2xl rounded-3xl'
            src={assets.header_img} 
            alt="Header" 
          />
          {/* Glow Behind Image */}
          <div className='absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-400/30 to-transparent blur-2xl -z-10'></div>
        </motion.div>
      </div>
    </div>
  )
}

export default Header
