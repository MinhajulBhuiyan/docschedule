import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true)

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <form onSubmit={onSubmitHandler} className='bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl shadow-slate-200/50'>
          
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-light text-slate-800 mb-2'>
              Welcome <span className='font-medium text-[#155af9]'>Back</span>
            </h1>
            <div className='flex items-center justify-center gap-1 bg-slate-100 rounded-full p-1 w-fit mx-auto'>
              <button
                type="button"
                onClick={() => setState('Admin')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  state === 'Admin' 
                    ? 'bg-white text-[#155af9] shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setState('Doctor')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  state === 'Doctor' 
                    ? 'bg-white text-[#155af9] shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Doctor
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className='space-y-6'>
            <div className='group'>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/50 focus:bg-white focus:border-[#155af9] focus:ring-2 focus:ring-[#155af9]/10 transition-all duration-200 outline-none placeholder-slate-400'
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className='group'>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className='w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl bg-white/50 focus:bg-white focus:border-[#155af9] focus:ring-2 focus:ring-[#155af9]/10 transition-all duration-200 outline-none placeholder-slate-400'
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600'
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className='w-full mt-8 bg-gradient-to-r from-[#155af9] to-[#155af9]/90 hover:from-[#155af9]/90 hover:to-[#155af9] text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#155af9]/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
          >
            {loading ? (
              <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
            ) : (
              `Sign in as ${state}`
            )}
          </button>

          {/* Footer */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-slate-600'>
              Need to switch? 
              <button
                type="button"
                onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')}
                className='ml-1 text-[#155af9] hover:text-[#155af9]/80 font-medium underline transition-colors duration-200'
              >
                {state === 'Admin' ? 'Doctor Login' : 'Admin Login'}
              </button>
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login