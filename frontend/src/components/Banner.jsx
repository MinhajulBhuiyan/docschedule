import React from 'react'
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

const Banner = () => {
    const navigate = useNavigate()

    // Professional SVG Icons
    const LightningIcon = ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    );

    const DoctorIcon = ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );

    const SecurityIcon = ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    );

    const SupportIcon = ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );

    const HospitalIcon = ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    );

    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 shadow-xl px-6 md:px-8 lg:px-12 my-12 mx-auto max-w-6xl'>
            {/* Background Floating Blobs */}
            <motion.div
                animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className='absolute -top-16 -left-16 w-32 h-32 bg-blue-300/15 rounded-full blur-2xl'
            />
            <motion.div
                animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className='absolute bottom-4 -right-16 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl'
            />

            {/* Main Content */}
            <div className='flex flex-col md:flex-row items-center justify-center relative z-10 gap-6 md:gap-8'>
                {/* Left Section */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className='md:w-1/2 flex flex-col justify-center gap-4 py-8'
                >
                    <div className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <HospitalIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="leading-none">Premium Healthcare</span>
                        </div>
                        <p className='text-blue-100 ml-11'>At Your Fingertips</p>
                    </div>

                    <p className='text-white text-base md:text-lg max-w-lg leading-relaxed'>
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
                            <div className='w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center'>
                                <LightningIcon className="w-4 h-4 text-white" />
                            </div>
                            <span className='text-white font-medium text-base md:text-lg'>Instant Appointment Booking</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className='flex items-center gap-3'
                        >
                            <div className='w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center'>
                                <DoctorIcon className="w-4 h-4 text-white" />
                            </div>
                            <span className='text-white font-medium text-base md:text-lg'>100+ Verified Medical Experts</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className='flex items-center gap-3'
                        >
                            <div className='w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center'>
                                <SecurityIcon className="w-4 h-4 text-white" />
                            </div>
                            <span className='text-white font-medium text-base md:text-lg'>100% Secure & Private</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className='flex items-center gap-3'
                        >
                            <div className='w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center'>
                                <SupportIcon className="w-4 h-4 text-white" />
                            </div>
                            <span className='text-white font-medium text-base md:text-lg'>24/7 Healthcare Support</span>
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className='flex items-center gap-4 mt-4 pt-3 border-t border-white/20'
                    >
                        <div className='text-center'>
                            <div className='text-2xl font-bold text-white'>1000+</div>
                            <div className='text-white text-sm'>Happy Patients</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-2xl font-bold text-white'>4.9★</div>
                            <div className='text-white text-sm'>User Rating</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-2xl font-bold text-white'>24/7</div>
                            <div className='text-white text-sm'>Available</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Section */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className='md:w-1/2 relative flex flex-col justify-center items-center mt-4 md:mt-0 gap-4'
                >
                    <motion.img
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className='w-[350px] h-auto drop-shadow-xl relative z-10'
                        src={assets.appointment_img}
                        alt="Healthcare Professional"
                    />


                    {/* Subtle Glow */}
                    <div className='absolute inset-0 bg-gradient-to-t from-blue-400/20 to-transparent blur-xl -z-10'></div>
                </motion.div>
            </div>
        </div>
    )
}

export default Banner