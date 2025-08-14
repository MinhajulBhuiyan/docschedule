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
const [showDropdown, setShowDropdown] = useState(false);

// Close dropdown when clicking outside
React.useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".profile-menu")) {
      setShowDropdown(false);
    }
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);
  return (
    <div className='relative overflow-visible bg-white shadow-lg border-b border-gray-100 z-50'>

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
    {/* Right Side Actions */}
<div className='flex items-center gap-6'>
  {token && userData ? (
    <div
      className='flex items-center gap-3 cursor-pointer profile-menu relative'
      onClick={() => setShowDropdown((prev) => !prev)}
    >
      <motion.div whileHover={{ scale: 1.1 }} className='relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg animate-pulse'></div>
        <img
          className='w-12 h-12 rounded-full border-4 border-white shadow-xl relative z-10'
          src={userData.image}
          alt="Profile"
        />
        <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-lg'></div>
      </motion.div>

      <motion.img
        className={`w-4 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
        src={assets.dropdown_icon}
        alt="Dropdown"
      />

      <AnimatePresence>
        {showDropdown && (
         <motion.div
  initial={{ opacity: 0, y: 10, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 10, scale: 0.95 }}
  transition={{ duration: 0.2 }}
  className="absolute top-14 right-0 text-base font-medium text-gray-700 z-[9999]"
>
            <div className="min-w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col gap-2 p-4">
              <div
                onClick={() => navigate('/my-profile')}
                className='flex items-center gap-4 px-4 py-4 rounded-xl hover:text-blue-600 hover:bg-gray-50 cursor-pointer transition-all duration-200'
              >
                My Profile
              </div>
              <div
                onClick={() => navigate('/my-appointments')}
                className='flex items-center gap-4 px-4 py-4 rounded-xl hover:text-green-600 hover:bg-gray-50 cursor-pointer transition-all duration-200'
              >
                My Appointments
              </div>
              <div
                onClick={logout}
                className='flex items-center gap-4 px-4 py-4 rounded-xl hover:text-red-600 hover:bg-gray-50 cursor-pointer transition-all duration-200'
              >
                Logout
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <motion.button
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/login')}
      className='bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hidden md:block'
    >
      ✨ Create Account ✨
    </motion.button>
  )}
</div>
    </div>
    </div>
  )
}

export default Navbar