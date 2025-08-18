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
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='relative overflow-hidden bg-white shadow-xl border-b border-gray-100 z-50'>
      {/* Subtle Background Elements - Matching Frontend Colors */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-50/40 to-blue-100/40'></div>
      <div className='absolute top-0 right-20 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl'></div>
      <div className='absolute top-0 left-20 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl'></div>

      <div className='relative z-10 flex justify-between items-center px-6 sm:px-10 py-4'>
        <div className='flex items-center gap-3'>
          <img 
            onClick={() => navigate('/')} 
            className='w-36 sm:w-40 cursor-pointer hover:scale-105 transition-transform duration-300' 
            src={assets.admin_logo} 
            alt="Admin Logo" 
          />
          <div className='px-4 py-2 rounded-full border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md hover:shadow-lg transition-all duration-300'>
            <span className='text-sm font-semibold text-blue-800'>
              {aToken ? '👨‍💼 Admin Panel' : '👨‍⚕️ Doctor Panel'}
            </span>
          </div>
        </div>

        <button 
          onClick={() => logout()} 
          className='relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-600 text-white text-sm px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95'
        >
          <span className='flex items-center gap-2'>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </span>
        </button>
      </div>
    </div>
  )
}

export default Navbar