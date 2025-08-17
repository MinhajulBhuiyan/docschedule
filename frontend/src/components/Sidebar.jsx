import React, { useContext, useState, useEffect } from 'react'
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-menu")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navItems = [
    { 
      path: '/', 
      label: 'HOME', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      path: '/doctors', 
      label: 'ALL DOCTORS', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      path: '/about', 
      label: 'ABOUT', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      path: '/contact', 
      label: 'CONTACT', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
  ]

  const isActive = (path) => location.pathname === path

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false)
  }, [location.pathname])

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobile && showMobileMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full shadow-lg md:hidden"
        >
          <motion.div
            animate={{ rotate: showMobileMenu ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.div>
        </motion.button>
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: isMobile ? -300 : 0 }}
        animate={{ 
          x: isMobile && !showMobileMenu ? -300 : 0,
          width: isCollapsed ? (isMobile ? '280px' : '80px') : '288px'
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`fixed left-0 top-0 h-full bg-white text-gray-800 z-50 transition-all duration-300 ease-in-out border-r border-gray-200 ${
          isMobile ? 'w-72' : (isCollapsed ? 'w-20' : 'w-72')
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-400 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-4 w-3 h-3 bg-gray-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-6 w-2 h-2 bg-gray-300 rounded-full blur-sm"
        />

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {(!isCollapsed || isMobile) && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <img 
                    onClick={() => navigate('/')} 
                    className="w-32 h-auto" 
                    src={assets.logo} 
                    alt="Logo" 
                  />
                </motion.div>
              )}
              {!isMobile && (
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </motion.button>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-gray-100 text-gray-900 shadow-sm border border-gray-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {(!isCollapsed || isMobile) && (
                      <span className="font-semibold">{item.label}</span>
                    )}
                    
                    {/* Active Indicator */}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute right-2 w-2 h-2 bg-gray-600 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    {/* Hover Effect */}
                    {!isActive(item.path) && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-gray-100/0 to-gray-100/50 rounded-xl"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            {token && userData ? (
              <div className="profile-menu relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full blur-lg animate-pulse"></div>
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white shadow-lg relative z-10"
                      src={userData.image}
                      alt="Profile"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  
                  {(!isCollapsed || isMobile) && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{userData.name}</p>
                      <p className="text-xs text-gray-500 truncate">{userData.email}</p>
                    </div>
                  )}

                  {(!isCollapsed || isMobile) && (
                    <motion.div
                      animate={{ rotate: showDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showDropdown && (!isCollapsed || isMobile) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-0 right-0 mb-2 z-50"
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                        <div
                          onClick={() => navigate('/my-profile')}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                          <span className="text-gray-600">👤</span>
                          <span className="text-gray-700 font-medium">My Profile</span>
                        </div>
                        <div
                          onClick={() => navigate('/my-appointments')}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                          <span className="text-gray-600">📅</span>
                          <span className="text-gray-700 font-medium">My Appointments</span>
                        </div>
                        <div
                          onClick={logout}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                          <span className="text-red-600">🚪</span>
                          <span className="text-gray-700 font-medium">Logout</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {(!isCollapsed || isMobile) ? (
                  <span>Create Account</span>
                ) : (
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )}
              </motion.button>
            )}
          </div>
        </div>

        {/* Collapsed Tooltips */}
        {isCollapsed && !isMobile && (
          <div className="absolute left-full top-0 ml-2 w-48 bg-gray-900 text-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="px-3 py-2 text-sm">
              {navItems.map(item => (
                <div key={item.path} className="py-1">
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default Sidebar
