import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
  }

  return (
    <div className='fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50'>
      <div className='flex items-center justify-between py-4 px-6'>
        {/* Logo Section */}
        <div className='flex items-center gap-4'>
          <img 
            onClick={() => navigate('/')} 
            className='h-8 cursor-pointer hover:opacity-80 transition-opacity' 
            src={assets.admin_logo} 
            alt="DocSchedule" 
          />
          <div className='hidden sm:flex items-center px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200'>
            <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
            <span className='text-sm font-medium text-blue-700'>
              {aToken ? 'Admin Panel' : 'Doctor Panel'}
            </span>
          </div>
        </div>

        {/* User Actions */}
        <div className='flex items-center gap-3'>
          <button 
            onClick={logout} 
            className='flex items-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 text-sm px-4 py-2 rounded-md font-medium transition-all duration-200 border border-gray-200 hover:border-red-200'
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            <span className='hidden sm:inline'>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar