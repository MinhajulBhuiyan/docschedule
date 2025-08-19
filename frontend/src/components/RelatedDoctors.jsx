import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const RelatedDoctors = ({ speciality, docId }) => {
    const navigate = useNavigate()
    const { doctors, currencySymbol } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData.slice(0, 6)) // Limit to 6 related doctors
        }
    }, [doctors, speciality, docId])

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    if (relDoc.length === 0) {
        return null
    }

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20'
        >
            {/* Section Header */}
            <div className='text-center mb-12'>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'
                >
                    Related <span className='text-blue-600'>Doctors</span>
                </motion.h2>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='flex items-center justify-center gap-2 mb-4'
                >
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className='text-blue-600 font-semibold text-lg'>{speciality} Specialists</span>
                </motion.div>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className='text-gray-600 text-lg max-w-2xl mx-auto'
                >
                    Discover other qualified doctors in the same specialty for your healthcare needs
                </motion.p>
            </div>

            {/* Doctors Grid */}
            <motion.div 
                variants={containerVariants}
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
            >
                {relDoc.map((doctor, index) => (
                    <motion.div
                        key={doctor._id}
                        variants={cardVariants}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { navigate(`/appointment/${doctor._id}`); window.scrollTo(0, 0) }}
                        className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-500 relative'
                    >
                        {/* Doctor Image */}
                        <div className='relative overflow-hidden aspect-square'>
                            <img 
                                className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110' 
                                src={doctor.image} 
                                alt={doctor.name}
                                loading='lazy'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500'></div>
                            
                            {/* Status Badge */}
                            <div className='absolute top-4 right-4'>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur-sm rounded-full ${
                                        doctor.available 
                                            ? 'bg-green-500/90 text-white' 
                                            : 'bg-gray-800/90 text-white'
                                    }`}
                                >
                                    <motion.div 
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-green-200' : 'bg-gray-400'}`}
                                    ></motion.div>
                                    {doctor.available ? 'Available' : 'Busy'}
                                </motion.div>
                            </div>

                            {/* Hover overlay */}
                            <div className='absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                        </div>

                        {/* Doctor Info */}
                        <div className='p-6 relative z-10'>
                            <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300'>
                                {doctor.name}
                            </h3>
                            <p className='text-blue-600 font-medium mb-3 text-sm bg-blue-50 px-3 py-1 rounded-full inline-block'>
                                {doctor.speciality}
                            </p>
                            
                            {/* Doctor Details */}
                            <div className='space-y-2 mb-4'>
                                {doctor.experience && (
                                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className='font-medium'>
                                            {typeof doctor.experience === 'string' ? doctor.experience : 
                                             typeof doctor.experience === 'object' && doctor.experience.line1 ? doctor.experience.line1 :
                                             `${doctor.experience} Years`} Experience
                                        </span>
                                    </div>
                                )}
                                
                                {(doctor.fees || doctor.fee) && (
                                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className='font-medium'>{currencySymbol}{doctor.fees || doctor.fee}</span>
                                    </div>
                                )}
                            </div>

                            {/* Book Button */}
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='w-full bg-gray-900 text-white py-3 px-4 text-sm font-semibold hover:bg-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:shadow-lg relative overflow-hidden rounded-xl'
                            >
                                <span className='relative z-10 flex items-center justify-center gap-2'>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M3 7h18M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7" />
                                    </svg>
                                    Book Appointment
                                </span>
                                <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'></div>
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* View More Button */}
            {doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId).length > 6 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className='text-center mt-12'
                >
                    <button 
                        onClick={() => navigate(`/doctors/${speciality}`)}
                        className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto'
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        View All {speciality} Doctors
                    </button>
                </motion.div>
            )}
        </motion.div>
    )
}

export default RelatedDoctors