import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const { backendUrl, token, setToken } = useContext(AppContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
            localStorage.setItem('token', data.token)
            setToken(data.token)
        } else {
            toast.error(data.message)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <div className='bg-gray-50 flex items-start justify-center pt-2 px-4 pb-12 min-h-screen'>
            <div className='w-full max-w-md'>
                <div className='bg-white rounded-lg shadow-md p-8'>
                    <h2 className='text-2xl font-bold text-gray-900 text-center mb-2'>Welcome Back</h2>
                    <p className='text-gray-600 text-center mb-6'>Sign in to book your appointment</p>

                    <form onSubmit={onSubmitHandler} className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#155af9] focus:border-transparent'
                                type="email"
                                required
                                placeholder='Enter your email'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                            <div className='relative'>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className='w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#155af9] focus:border-transparent'
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder='Enter your password'
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
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

                        <button className='w-full bg-[#1a66ff] text-white py-3 rounded-md font-medium hover:bg-[#155af9] transition-colors'>
                            Sign In
                        </button>
                    </form>

                    <p className='text-center text-gray-600 mt-6'>
                        Don't have an account? {' '}
                        <Link to='/signup' className='text-[#155af9] font-medium hover:underline'>
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Login