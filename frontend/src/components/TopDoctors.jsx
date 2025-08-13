import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion";

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='relative overflow-hidden flex flex-col items-center gap-6 my-16 text-gray-800 bg-gradient-to-b from-white to-gray-50 px-4'>
            {/* Background Floating Blobs */}
            <motion.div 
                animate={{ y: [0, 20, 0], x: [0, 12, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className='absolute top-32 right-20 w-72 h-72 bg-blue-200/15 rounded-full blur-3xl'
            />
            <motion.div 
                animate={{ y: [0, -20, 0], x: [0, -12, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className='absolute bottom-32 left-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl'
            />

            <div className='relative z-10 flex flex-col items-center gap-6'>
                <div className='text-center max-w-2xl mx-auto'>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>Top Doctors to Book</h1>
                    <p className='text-base text-gray-600 leading-relaxed'>Simply browse through our extensive list of trusted doctors.</p>
                </div>
                
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-6 max-w-6xl mx-auto'>
                    {doctors.slice(0, 10).map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            key={index}
                        >
                            <div 
                                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                                className='group bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-500 ease-out shadow-md hover:-translate-y-1 hover:border-blue-200' 
                            >
                                <div className='relative overflow-hidden'>
                                    <div className='absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                    <img 
                                        className='w-full h-36 object-cover bg-gradient-to-br from-blue-50 to-blue-100 transition-transform duration-500 group-hover:scale-110' 
                                        src={item.image} 
                                        alt={item.name} 
                                    />
                                </div>
                                <div className='p-4'>
                                    <div className={`flex items-center gap-2 mb-2`}>
                                        <div className={`w-2.5 h-2.5 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-400"} shadow-sm`}></div>
                                        <span className={`text-xs font-medium ${item.available ? 'text-green-600' : "text-gray-500"}`}>
                                            {item.available ? 'Available' : "Not Available"}
                                        </span>
                                    </div>
                                    <h3 className='text-gray-900 text-base font-bold mb-1 group-hover:text-blue-600 transition-colors duration-300'>{item.name}</h3>
                                    <p className='text-gray-600 text-sm font-medium'>{item.speciality}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                    className='bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-10 py-3 rounded-full mt-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg'
                >
                    View More Doctors
                </motion.button>
            </div>
        </div>
    )
}

export default TopDoctors