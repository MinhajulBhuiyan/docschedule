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
                    className='md:w-1/2 flex flex-col justify-center gap-6 py-12'
                >
                    <div className='text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-lg'>
                        <p className='mb-2'>🏥 Premium Healthcare</p>
                        <p className='text-blue-100'>At Your Fingertips</p>
                    </div>
                    
                    <p className='text-blue-100/90 text-base mt-2 mb-6 max-w-lg'>
                        Experience world-class medical care with verified doctors, instant booking, and comprehensive health solutions
                    </p>

                    {/* Key Features */}
                    <div className='space-y-3'>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className='flex items-center gap-3'
                        >
                            <div className='w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
                                <span className='text-lg'>⚡</span>
                            </div>
                            <span className='text-white font-medium'>Instant Appointment Booking</span>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className='flex items-center gap-3'
                        >
                            <div className='w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
                                <span className='text-lg'>👨‍⚕️</span>
                            </div>
                            <span className='text-white font-medium'>100+ Verified Medical Experts</span>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className='flex items-center gap-3'
                        >
                            <div className='w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
                                <span className='text-lg'>🔒</span>
                            </div>
                            <span className='text-white font-medium'>100% Secure & Private</span>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className='flex items-center gap-3'
                        >
                            <div className='w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
                                <span className='text-lg'>📱</span>
                            </div>
                            <span className='text-white font-medium'>24/7 Healthcare Support</span>
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className='flex items-center gap-8 mt-6 pt-4 border-t border-white/20'
                    >
                        <div className='text-center'>
                            <div className='text-2xl font-bold text-white'>50K+</div>
                            <div className='text-blue-100/80 text-sm'>Happy Patients</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-2xl font-bold text-white'>4.9★</div>
                            <div className='text-blue-100/80 text-sm'>User Rating</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-2xl font-bold text-white'>24/7</div>
                            <div className='text-blue-100/80 text-sm'>Available</div>
                        </div>
                    </motion.div>
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