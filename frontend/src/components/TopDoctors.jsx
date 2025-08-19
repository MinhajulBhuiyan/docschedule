import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion";

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 px-4'>
            {/* Enhanced Background Elements */}
            <div className='absolute inset-0 overflow-hidden'>
                <motion.div 
                    animate={{ 
                        y: [0, 20, 0], 
                        x: [0, 15, 0],
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className='absolute top-20 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-100/60 to-indigo-100/40 blur-3xl'
                />
                <motion.div 
                    animate={{ 
                        y: [0, -25, 0], 
                        x: [0, -20, 0],
                        scale: [1, 1.2, 1],
                        rotate: [0, -8, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className='absolute bottom-32 left-1/5 w-48 h-48 bg-gradient-to-br from-purple-100/50 to-blue-100/60 blur-3xl'
                />
                <motion.div 
                    animate={{ 
                        y: [0, 30, 0], 
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cyan-100/40 to-blue-100/50 blur-2xl'
                />
            </div>

            <div className='max-w-7xl mx-auto relative z-10'>
                {/* Enhanced Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className='text-center mb-20'
                >
                    {/* Subtitle Badge */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm px-6 py-2 mb-6'
                    >
                        <div className='w-2 h-2 bg-blue-500'></div>
                        <span className='text-blue-700 text-sm font-semibold uppercase tracking-wider'>Featured Specialists</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className='text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight'
                    >
                        Meet Our <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>Expert Doctors</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'
                    >
                        Connect with world-class medical professionals who are committed to delivering 
                        <span className='font-semibold text-gray-800'> personalized, exceptional healthcare</span> tailored to your needs.
                    </motion.p>
                </motion.div>
                
                {/* Enhanced Doctors Grid */}
                <motion.div 
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mb-20'
                >
                    {doctors.slice(0, 10).map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                            key={index}
                            className='group'
                        >
                            <div 
                                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                                className='bg-white border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 hover:border-blue-200 h-full flex flex-col relative before:absolute before:inset-0 before:bg-gradient-to-t before:from-blue-50/0 before:to-blue-50/20 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100'
                            >
                                {/* Enhanced Image Container */}
                                <div className='relative overflow-hidden aspect-square'>
                                    <img 
                                        className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110' 
                                        src={item.image} 
                                        alt={item.name} 
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500'></div>
                                    
                                    {/* Enhanced Status Badge */}
                                    <div className='absolute top-4 right-4'>
                                        <motion.div 
                                            whileHover={{ scale: 1.05 }}
                                            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold shadow-lg backdrop-blur-sm ${
                                                item.available 
                                                    ? 'bg-green-500/90 text-white' 
                                                    : 'bg-gray-800/90 text-white'
                                            }`}
                                        >
                                            <motion.div 
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className={`w-2 h-2 ${item.available ? 'bg-green-200' : 'bg-gray-400'}`}
                                            ></motion.div>
                                            {item.available ? 'Available Now' : 'Busy'}
                                        </motion.div>
                                    </div>

                                    {/* Overlay gradient on hover */}
                                    <div className='absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                                </div>

                                {/* Enhanced Content Container */}
                                <div className='p-6 flex-1 flex flex-col justify-between relative z-10'>
                                    <div>
                                        <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1'>
                                            {item.name}
                                        </h3>
                                        <p className='text-gray-600 text-sm font-medium mb-4 line-clamp-1 group-hover:text-gray-700 transition-colors duration-300'>
                                            {item.speciality}
                                        </p>
                                    </div>
                                    
                                    {/* Enhanced Book Button */}
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className='w-full bg-gray-900 text-white py-3 px-4 text-sm font-semibold hover:bg-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:shadow-lg relative overflow-hidden rounded-full'
                                    >
                                        <span className='relative z-10'>Book Appointment</span>
                                        <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'></div>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                
                {/* Enhanced CTA Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className='text-center'
                >
                    <motion.button 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                        className='inline-flex items-center gap-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-10 py-5 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group rounded-full'
                    >
                        <span className='relative z-10 text-lg'>View All Doctors</span>
                        <motion.svg 
                            className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                        
                        {/* Button shine effect */}
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}

export default TopDoctors