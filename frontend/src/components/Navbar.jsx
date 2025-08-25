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
    <div className='fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50'>
      <div className='max-w-7xl mx-auto flex items-center justify-between py-4 px-6'>
        {/* Logo Section */}
        <div className='flex items-center gap-4'>
          <img 
            onClick={() => navigate('/')} 
            className='w-36 cursor-pointer hover:opacity-80 transition-opacity' 
            src={assets.logo} 
            alt="DocSchedule" 
          />
          <div className='hidden lg:flex items-center px-3 py-1.5 rounded-md bg-green-50 border border-green-200'>
            <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
            <span className='text-sm font-medium text-green-700'>
              Patient Portal
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className='hidden md:flex items-center gap-6'>
          <NavLink to='/' className={({ isActive }) => 
            `text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
              isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`
          }>
            <li>HOME</li>
          </NavLink>
          
          <NavLink to='/doctors' className={({ isActive }) => 
            `text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
              isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`
          }>
            <li>ALL DOCTORS</li>
          </NavLink>
          
          <NavLink to='/about' className={({ isActive }) => 
            `text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
              isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`
          }>
            <li>ABOUT</li>
          </NavLink>
          
          <NavLink to='/contact' className={({ isActive }) => 
            `text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
              isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`
          }>
            <li>CONTACT</li>
          </NavLink>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className='md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors'
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Right Side Actions */}
        <div className='hidden md:flex items-center gap-3'>
          {!token ? (
            <div className='flex items-center gap-3'>
              <NavLink to='/login' className='text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2'>
                Login
              </NavLink>
              <NavLink to='/signup' className='bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'>
                Sign Up
              </NavLink>
            </div>
          ) : (
            <div className='flex items-center gap-3'>
              <NavLink to='/my-appointments' className='text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2'>
                My Appointments
              </NavLink>
              <div className="profile-menu relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className='flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:border-gray-300 transition-colors bg-white'
                >
                  <img 
                    src={userData?.image || assets.profile_pic} 
                    alt="Profile" 
                    className='w-7 h-7 rounded-full object-cover'
                  />
                  <span className='text-sm font-medium text-gray-700'>{userData?.name || 'User'}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50'>
                    <NavLink to='/my-profile' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'>
                      My Profile
                    </NavLink>
                    <button 
                      onClick={logout}
                      className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
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
        <div className='md:hidden bg-white border-t border-gray-200'>
          <div className='px-6 py-4 space-y-2'>
            <NavLink to='/' className='block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors' onClick={() => setShowMenu(false)}>
              HOME
            </NavLink>
            <NavLink to='/doctors' className='block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors' onClick={() => setShowMenu(false)}>
              ALL DOCTORS
            </NavLink>
            <NavLink to='/about' className='block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors' onClick={() => setShowMenu(false)}>
              ABOUT
            </NavLink>
            <NavLink to='/contact' className='block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors' onClick={() => setShowMenu(false)}>
              CONTACT
            </NavLink>
            {token && (
              <>
                <NavLink to='/my-appointments' className='block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors' onClick={() => setShowMenu(false)}>
                  My Appointments
                </NavLink>
                <NavLink to='/my-profile' className='block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors' onClick={() => setShowMenu(false)}>
                  My Profile
                </NavLink>
                <button 
                  onClick={() => { logout(); setShowMenu(false); }}
                  className='block w-full text-left py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors'
                >
                  Logout
                </button>
              </>
            )}
            {!token && (
              <div className='pt-2 border-t border-gray-200 mt-2'>
                <NavLink to='/login' className='block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors' onClick={() => setShowMenu(false)}>
                  Login
                </NavLink>
                <NavLink to='/signup' className='block py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors' onClick={() => setShowMenu(false)}>
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar