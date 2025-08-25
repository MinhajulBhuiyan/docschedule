import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const menuItems = [
    { path: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { path: '/all-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { path: '/add-doctor', icon: assets.add_icon, label: 'Add Doctor' },
    { path: '/doctor-list', icon: assets.people_icon, label: 'Doctors List' },
    { path: '/patients-list', icon: assets.patients_icon, label: 'Patients List' }
  ]

  const doctorMenuItems = [
    { path: '/doctor-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { path: '/doctor-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { path: '/doctor-profile', icon: assets.people_icon, label: 'Profile' }
  ]

  return (
    <div className='min-h-screen bg-white border-r border-gray-200 fixed left-0 top-16 w-64 z-40'>      
      <div className='p-4'>
        {/* Header Section */}
        <div className='mb-8 p-3 rounded-lg bg-blue-50 border border-blue-100'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className='font-semibold text-gray-900'>
                {aToken ? 'Admin Panel' : 'Doctor Portal'}
              </h3>
              <p className='text-blue-600 text-xs'>{aToken ? 'Admin Dashboard' : 'Doctor Panel'}</p>
            </div>
          </div>
        </div>

        {/* Admin Menu */}
        {aToken && (
          <div>
            <h4 className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-2'>
              ADMIN PANEL
            </h4>
            <ul className='space-y-1'>
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `
                      flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
                      ${isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <img className='w-5 h-5' src={item.icon} alt={item.label} />
                    <span className='font-medium text-sm'>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Doctor Menu */}
        {dToken && (
          <div>
            <h4 className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-2'>
              DOCTOR PORTAL
            </h4>
            <ul className='space-y-1'>
              {doctorMenuItems.map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `
                      flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
                      ${isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <img className='w-5 h-5' src={item.icon} alt={item.label} />
                    <span className='font-medium text-sm'>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Section */}
        <div className='mt-8 p-3 rounded-lg bg-gray-50 border border-gray-200'>
          <div className='flex items-center gap-3'>
            <div className='w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center'>
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className='text-xs text-gray-700 font-medium'>Need Help?</p>
              <p className='text-xs text-gray-500'>Contact support team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar