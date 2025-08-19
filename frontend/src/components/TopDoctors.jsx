import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion";

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    // Define color themes for each specialty
    const specialtyColors = {
        'General Physician': { bg: 'bg-blue-50', text: 'text-blue-600', hoverText: 'text-blue-700', border: 'border-blue-100', hoverBorder: 'border-blue-200' },
        'Gynecologist': { bg: 'bg-pink-50', text: 'text-pink-600', hoverText: 'text-pink-700', border: 'border-pink-100', hoverBorder: 'border-pink-200' },
        'Dermatologist': { bg: 'bg-green-50', text: 'text-green-600', hoverText: 'text-green-700', border: 'border-green-100', hoverBorder: 'border-green-200' },
        'Pediatricians': { bg: 'bg-yellow-50', text: 'text-yellow-600', hoverText: 'text-yellow-700', border: 'border-yellow-100', hoverBorder: 'border-yellow-200' },
        'Neurologist': { bg: 'bg-purple-50', text: 'text-purple-600', hoverText: 'text-purple-700', border: 'border-purple-100', hoverBorder: 'border-purple-200' },
        'Gastroenterologist': { bg: 'bg-indigo-50', text: 'text-indigo-600', hoverText: 'text-indigo-700', border: 'border-indigo-100', hoverBorder: 'border-indigo-200' }
    }

    // Sort doctors by experience (extract number from experience string) and get top 8
    const getExperienceValue = (experience) => {
        const match = experience.match(/(\d+)/)
        return match ? parseInt(match[1]) : 0
    }

    const topDoctorsByExperience = doctors
        .sort((a, b) => getExperienceValue(b.experience) - getExperienceValue(a.experience))
        .slice(0, 8)

    return (
        <div className='relative overflow-hidden bg-white py-24 px-4'>
            <div className='max-w-7xl mx-auto'>
                {/* Enhanced Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className='text-center mb-20'
                >
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
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20'
                >
                    {topDoctorsByExperience.map((item, index) => {
                        const colorTheme = specialtyColors[item.speciality] || specialtyColors['General Physician']
                        return (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                            key={index}
                            className='group'
                        >
                            <div 
                                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                                className={`bg-white border ${colorTheme.border} shadow-sm overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 hover:${colorTheme.hoverBorder} h-full flex flex-col relative before:absolute before:inset-0 before:bg-gradient-to-t before:from-blue-50/0 before:to-blue-50/20 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100`}
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
                                        <h3 className='text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1'>
                                            {item.name}
                                        </h3>
                                        <p className={`${colorTheme.text} text-sm font-bold mb-4 line-clamp-1 group-hover:${colorTheme.hoverText} transition-colors duration-300 ${colorTheme.bg} px-3 py-1 rounded-full text-center border ${colorTheme.border}`}>
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
                        )
                    })}
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