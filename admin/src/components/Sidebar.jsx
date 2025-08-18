import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const menuItems = [
    { path: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard', description: 'Overview & Analytics' },
    { path: '/all-appointments', icon: assets.appointment_icon, label: 'Appointments', description: 'Manage Bookings' },
    { path: '/add-doctor', icon: assets.add_icon, label: 'Add Doctor', description: 'Register New Doctor' },
    { path: '/doctor-list', icon: assets.people_icon, label: 'Doctors List', description: 'View All Doctors' }
  ]

  const doctorMenuItems = [
    { path: '/doctor-dashboard', icon: assets.home_icon, label: 'Dashboard', description: 'Your Overview' },
    { path: '/doctor-appointments', icon: assets.appointment_icon, label: 'Appointments', description: 'Your Schedule' },
    { path: '/doctor-profile', icon: assets.people_icon, label: 'Profile', description: 'Manage Profile' }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-blue-100/30 border-r border-gray-100 shadow-xl relative overflow-hidden fixed left-0 top-0 w-80 z-40'>
      {/* Background Decorative Elements - Matching Frontend Colors */}
      <div className='absolute top-20 right-0 w-32 h-32 bg-blue-300/20 rounded-full blur-3xl'></div>
      <div className='absolute bottom-20 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl'></div>
      
      <div className='relative z-10 p-6'>
        {/* Header Section - Using Frontend Color Scheme */}
        <div className='mb-8 p-4 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white shadow-lg'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className='font-bold text-lg'>Welcome Back!</h3>
              <p className='text-blue-100 text-sm'>{aToken ? 'Admin Dashboard' : 'Doctor Portal'}</p>
            </div>
          </div>
        </div>

        {/* Admin Menu */}
        {aToken && (
          <div>
            <h4 className='text-xs font-semibold text-blue-700 uppercase tracking-wider mb-4 px-2'>Admin Panel</h4>
            <ul className='space-y-2'>
              {menuItems.map((item, index) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `
                      group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg scale-105' 
                        : 'text-gray-700 hover:bg-white hover:shadow-md hover:scale-105'
                      }
                    `}
                  >
                    {/* Active Indicator */}
                    {({ isActive }) => isActive && (
                      <div className='absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full'></div>
                    )}
                    
                    {/* Icon */}
                    <div className={`
                      p-2 rounded-lg transition-all duration-300
                      ${({ isActive }) => isActive 
                        ? 'bg-white/20' 
                        : 'bg-blue-100 group-hover:bg-blue-200'
                      }
                    `}>
                      <img className='w-5 h-5' src={item.icon} alt={item.label} />
                    </div>
                    
                    {/* Text Content */}
                    <div className='flex-1 min-w-0'>
                      <p className={`font-semibold text-sm transition-colors duration-300 ${
                        ({ isActive }) => isActive ? 'text-white' : 'text-gray-800'
                      }`}>
                        {item.label}
                      </p>
                      <p className={`text-xs transition-colors duration-300 ${
                        ({ isActive }) => isActive ? 'text-blue-100' : 'text-blue-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Arrow Icon */}
                    <svg 
                      className={`w-4 h-4 transition-all duration-300 ${
                        ({ isActive }) => isActive ? 'text-white' : 'text-blue-400'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Doctor Menu */}
        {dToken && (
          <div>
            <h4 className='text-xs font-semibold text-blue-700 uppercase tracking-wider mb-4 px-2'>Doctor Portal</h4>
            <ul className='space-y-2'>
              {doctorMenuItems.map((item, index) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `
                      group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg scale-105' 
                        : 'text-gray-700 hover:bg-white hover:shadow-md hover:scale-105'
                      }
                    `}
                  >
                    {/* Active Indicator */}
                    {({ isActive }) => isActive && (
                      <div className='absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full'></div>
                    )}
                    
                    {/* Icon */}
                    <div className={`
                      p-2 rounded-lg transition-all duration-300
                      ${({ isActive }) => isActive 
                        ? 'bg-white/20' 
                        : 'bg-blue-100 group-hover:bg-blue-200'
                      }
                    `}>
                      <img className='w-5 h-5' src={item.icon} alt={item.label} />
                    </div>
                    
                    {/* Text Content */}
                    <div className='flex-1 min-w-0'>
                      <p className={`font-semibold text-sm transition-colors duration-300 ${
                        ({ isActive }) => isActive ? 'text-white' : 'text-gray-800'
                      }`}>
                        {item.label}
                      </p>
                      <p className={`text-xs transition-colors duration-300 ${
                        ({ isActive }) => isActive ? 'text-blue-100' : 'text-blue-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Arrow Icon */}
                    <svg 
                      className={`w-4 h-4 transition-all duration-300 ${
                        ({ isActive }) => isActive ? 'text-white' : 'text-blue-400'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Section */}
        <div className='mt-8 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className='text-xs text-blue-700 font-medium'>Need Help?</p>
              <p className='text-xs text-blue-600'>Contact support team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar