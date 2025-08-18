import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='relative overflow-hidden bg-white shadow-xl border-b border-gray-100 z-50'>
      {/* Subtle Background Elements */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-50/40 to-purple-50/40'></div>
      <motion.div 
        animate={{ y: [0, 8, 0], x: [0, 4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className='absolute top-0 right-20 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl'
      />
      <motion.div 
        animate={{ y: [0, -8, 0], x: [0, -4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className='absolute top-0 left-20 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl'
      />

      <div className='relative z-10 flex justify-between items-center px-6 sm:px-10 py-4'>
        <motion.div 
          className='flex items-center gap-3'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img 
            onClick={() => navigate('/')} 
            className='w-36 sm:w-40 cursor-pointer hover:scale-105 transition-transform duration-300' 
            src={assets.admin_logo} 
            alt="Admin Logo" 
            whileHover={{ scale: 1.05 }}
          />
          <motion.div 
            className='px-4 py-2 rounded-full border-2 border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md'
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <span className='text-sm font-semibold text-gray-700'>
              {aToken ? '👨‍💼 Admin Panel' : '👨‍⚕️ Doctor Panel'}
            </span>
          </motion.div>
        </motion.div>

        <motion.button 
          onClick={() => logout()} 
          className='relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group'
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className='relative z-10 flex items-center gap-2'>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </span>
          <motion.div 
            className='absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600'
            initial={{ x: '-100%' }}
            whileHover={{ x: '0%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </div>
  )
}

export default Navbar