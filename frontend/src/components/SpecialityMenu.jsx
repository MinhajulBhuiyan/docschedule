import React from 'react'
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='relative overflow-hidden py-20 text-gray-800 bg-gradient-to-b from-gray-50 to-white'>
            {/* Background Floating Blobs */}
            <motion.div 
                animate={{ y: [0, 25, 0], x: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className='absolute top-20 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl'
            />
            <motion.div 
                animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className='absolute bottom-20 right-10 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl'
            />

            <div className='relative z-10 flex flex-col items-center gap-8'>
                <div className='text-center max-w-3xl mx-auto px-4'>
                    <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Find by Speciality</h1>
                    <p className='text-lg text-gray-600 leading-relaxed'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                </div>
                
                <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto px-4 pb-4'>
                    {specialityData.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            key={index}
                        >
                            <Link 
                                to={`/doctors/${item.speciality}`} 
                                onClick={() => scrollTo(0, 0)} 
                                className='group flex flex-col items-center text-center cursor-pointer flex-shrink-0 hover:scale-105 transition-all duration-500 ease-out' 
                            >
                                <div className='relative mb-4'>
                                    <div className='absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100'></div>
                                    <div className='relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-300 group-hover:shadow-blue-100/50'>
                                        <img 
                                            className='w-20 h-20 sm:w-24 sm:h-24 object-contain transition-transform duration-300 group-hover:scale-110' 
                                            src={item.image} 
                                            alt={item.speciality} 
                                        />
                                    </div>
                                </div>
                                <p className='font-semibold text-gray-800 text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-300'>{item.speciality}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SpecialityMenu