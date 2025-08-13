import React from 'react'
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 shadow-2xl px-6 md:px-12 lg:px-20 my-16 md:mx-10'>
            {/* Background Floating Blobs */}
            <motion.div 
                animate={{ y: [0, 15, 0], x: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className='absolute -top-20 -left-20 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl'
            />
            <motion.div 
                animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className='absolute bottom-8 -right-20 w-56 h-56 bg-blue-400/30 rounded-full blur-3xl'
            />

            {/* Main Content */}
            <div className='flex flex-col md:flex-row items-center justify-between relative z-10'>
                {/* Left Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className='md:w-1/2 flex flex-col justify-center gap-4 py-12'
                >
                    <div className='text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-lg'>
                        <p className='mb-2'>Book Appointment</p>
                        <p className='text-blue-100'>With 100+ Trusted Doctors</p>
                    </div>
                    <p className='text-blue-100/90 text-base mt-4 mb-6 max-w-sm'>Get the best healthcare experience with our verified medical professionals</p>
                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                        className='inline-flex items-center gap-3 bg-white text-blue-800 text-base font-semibold px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 shadow-lg'
                    >
                        Create Account
                    </motion.button>
                </motion.div>

                {/* Right Section */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className='md:w-1/2 relative flex justify-center md:justify-end items-end mt-8 md:mt-0'
                >
                    <motion.img 
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className='w-full max-w-md drop-shadow-2xl relative z-10' 
                        src={assets.appointment_img} 
                        alt="Appointment" 
                    />
                    {/* Glow Behind Image */}
                    <div className='absolute inset-0 bg-gradient-to-t from-blue-400/30 to-transparent blur-2xl -z-10'></div>
                </motion.div>
            </div>
        </div>
    )
}

export default Banner