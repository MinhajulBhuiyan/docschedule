import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='relative overflow-hidden bg-white shadow-lg border-b border-gray-100'>
      {/* Subtle Background Elements */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30'></div>
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

      <div className='relative z-10 flex items-center justify-between py-6 px-8'>
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className='cursor-pointer'
        >
          <img onClick={() => navigate('/')} className='w-44' src={assets.logo} alt="Logo" />
        </motion.div>

        {/* Desktop Navigation */}
        <ul className='md:flex items-center gap-8 font-semibold hidden'>
          <NavLink to='/' className='group relative'>
            <motion.li 
              className='py-3 px-6 rounded-xl text-gray-700 transition-all duration-300 group-hover:text-white group-hover:bg-blue-600 hover:shadow-lg'
              whileHover={{ y: -2 }}
            >
              HOME
            </motion.li>
            <motion.div 
              className='absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </NavLink>
          
          <NavLink to='/doctors' className='group relative'>
            <motion.li 
              className='py-3 px-6 rounded-xl text-gray-700 transition-all duration-300 group-hover:text-white group-hover:bg-blue-600 hover:shadow-lg'
              whileHover={{ y: -2 }}
            >
              ALL DOCTORS
            </motion.li>
            <motion.div 
              className='absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </NavLink>
          
          <NavLink to='/about' className='group relative'>
            <motion.li 
              className='py-3 px-6 rounded-xl text-gray-700 transition-all duration-300 group-hover:text-white group-hover:bg-blue-600 hover:shadow-lg'
              whileHover={{ y: -2 }}
            >
              ABOUT
            </motion.li>
            <motion.div 
              className='absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </NavLink>
          
          <NavLink to='/contact' className='group relative'>
            <motion.li 
              className='py-3 px-6 rounded-xl text-gray-700 transition-all duration-300 group-hover:text-white group-hover:bg-blue-600 hover:shadow-lg'
              whileHover={{ y: -2 }}
            >
              CONTACT
            </motion.li>
            <motion.div 
              className='absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </NavLink>
        </ul>

        {/* Right Side Actions */}
        <div className='flex items-center gap-6'>
          {token && userData ? (
            <div className='flex items-center gap-3 cursor-pointer group relative'>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className='relative'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg animate-pulse'></div>
                <img className='w-12 h-12 rounded-full border-4 border-white shadow-xl relative z-10' src={userData.image} alt="Profile" />
                <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-lg'></div>
              </motion.div>
              
              <motion.img 
                className='w-4 transition-transform duration-300 group-hover:rotate-180' 
                src={assets.dropdown_icon} 
                alt="Dropdown" 
              />
              
              <AnimatePresence>
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-0 right-0 pt-20 text-base font-medium text-gray-700 z-20 hidden group-hover:block'
                >
                  <div className='min-w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col gap-2 p-4'>
                    <motion.div 
                      whileHover={{ backgroundColor: '#f8fafc', scale: 1.02 }}
                      onClick={() => navigate('/my-profile')} 
                      className='flex items-center gap-4 px-4 py-4 rounded-xl hover:text-blue-600 cursor-pointer transition-all duration-200'
                    >
                      <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg'>
                        <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                        </svg>
                      </div>
                      <span className='font-semibold'>My Profile</span>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ backgroundColor: '#f8fafc', scale: 1.02 }}
                      onClick={() => navigate('/my-appointments')} 
                      className='flex items-center gap-4 px-4 py-4 rounded-xl hover:text-green-600 cursor-pointer transition-all duration-200'
                    >
                      <div className='w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg'>
                        <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                      </div>
                      <span className='font-semibold'>My Appointments</span>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ backgroundColor: '#f8fafc', scale: 1.02 }}
                      onClick={logout} 
                      className='flex items-center gap-4 px-4 py-4 rounded-xl hover:text-red-600 cursor-pointer transition-all duration-200'
                    >
                      <div className='w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg'>
                        <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                        </svg>
                      </div>
                      <span className='font-semibold'>Logout</span>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')} 
              className='bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hidden md:block border-2 border-white/20'
            >
              ✨ Create Account ✨
            </motion.button>
          )}
          
          <motion.img 
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMenu(true)} 
            className='w-8 md:hidden cursor-pointer' 
            src={assets.menu_icon} 
            alt="Menu" 
          />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className='md:hidden fixed inset-0 z-50 bg-white'
            >
              <div className='flex items-center justify-between px-6 py-6 border-b border-gray-100'>
                <img src={assets.logo} className='w-36' alt="Logo" />
                <motion.img 
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMenu(false)} 
                  src={assets.cross_icon} 
                  className='w-8 cursor-pointer' 
                  alt="Close" 
                />
              </div>
              
              <div className='px-6 py-8'>
                <ul className='flex flex-col gap-4'>
                  {[
                    { path: '/', label: 'HOME' },
                    { path: '/doctors', label: 'ALL DOCTORS' },
                    { path: '/about', label: 'ABOUT' },
                    { path: '/contact', label: 'CONTACT' }
                  ].map((item) => (
                    <motion.li
                      key={item.path}
                      whileHover={{ x: 10, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <NavLink 
                        onClick={() => setShowMenu(false)} 
                        to={item.path}
                        className='block px-6 py-4 text-xl font-bold text-gray-700 hover:text-white hover:bg-blue-600 rounded-2xl transition-all duration-200'
                      >
                        {item.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
                
                {!token && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { navigate('/login'); setShowMenu(false) }} 
                    className='w-full mt-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl'
                  >
                    ✨ Create Account ✨
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Navbar