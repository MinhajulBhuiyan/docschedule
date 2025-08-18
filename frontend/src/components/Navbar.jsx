import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

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
    <div className='fixed top-0 left-0 right-0 overflow-visible bg-white shadow-lg border-b border-gray-100 z-50'>

      {/* Subtle Background Elements - Matching Admin Colors */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-50/30 to-blue-100/30'></div>
      <div className='absolute top-0 right-20 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl'></div>
      <div className='absolute top-0 left-20 w-24 h-24 bg-blue-300/20 rounded-full blur-2xl'></div>

      <div className='relative z-10 flex items-center justify-between py-6 px-8'>
        {/* Logo */}
        <div className='cursor-pointer hover:scale-105 transition-transform duration-300'>
          <img onClick={() => navigate('/')} className='w-44' src={assets.logo} alt="Logo" />
        </div>

        {/* Desktop Navigation */}
        <ul className='md:flex items-center gap-8 font-semibold hidden'>
          <NavLink to='/' className='group relative'>
            <li className='py-3 px-6 rounded-xl text-gray-700 transition-all duration-300 group-hover:text-white group-hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5'>
              HOME
            </li>
            <div className='absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-0 group-hover:w-full transition-all duration-300'></div>
          </NavLink>
          
          <NavLink to='/doctors' className='group relative'>
            <li className='py-3 px-6 rounded-xl text-gray-700 transition-all duration-300 group-hover:text-white group-hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5'>
              ALL DOCTORS
            </li>
            <div className='absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-0 group-hover:w-full transition-all duration-300'></div>
          </NavLink>
          
          <NavLink to='/about' className='group relative'>
            <li className='py-3 px-6 rounded-xl text-gray-700 transition-all duration-300 group-hover:text-white group-hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5'>
              ABOUT
            </li>
            <div className='absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-0 group-hover:w-full transition-all duration-300'></div>
          </NavLink>
          
          <NavLink to='/contact' className='group relative'>
            <li className='py-3 px-6 rounded-xl text-gray-700 transition-all duration-300 group-hover:text-white group-hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5'>
              CONTACT
            </li>
            <div className='absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-0 group-hover:w-full transition-all duration-300'></div>
          </NavLink>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Right Side Actions */}
        <div className='flex items-center gap-6'>
          {!token ? (
            <div className='flex items-center gap-4'>
              <NavLink to='/login' className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>
                Login
              </NavLink>
              <NavLink to='/login' className='bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105'>
                Get Started
              </NavLink>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              <NavLink to='/my-appointments' className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>
                My Appointments
              </NavLink>
              <div className="profile-menu relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className='flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full border border-blue-200 hover:shadow-md transition-all duration-200'
                >
                  <img 
                    src={userData?.profilePic || assets.profile_pic} 
                    alt="Profile" 
                    className='w-8 h-8 rounded-full object-cover'
                  />
                  <span className='text-blue-800 font-medium'>{userData?.name || 'User'}</span>
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50'>
                    <NavLink to='/my-profile' className='block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200'>
                      My Profile
                    </NavLink>
                    <button 
                      onClick={logout}
                      className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg'>
          <div className='px-6 py-4 space-y-4'>
            <NavLink to='/' className='block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>
              HOME
            </NavLink>
            <NavLink to='/doctors' className='block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>
              ALL DOCTORS
            </NavLink>
            <NavLink to='/about' className='block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>
              ABOUT
            </NavLink>
            <NavLink to='/contact' className='block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>
              CONTACT
            </NavLink>
            {token && (
              <NavLink to='/my-appointments' className='block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>
                My Appointments
              </NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar