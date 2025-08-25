import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    const { backendUrl, setToken } = useContext(AppContext)

    const validateForm = () => {
        const newErrors = {}
        
        if (!email.trim()) newErrors.email = 'Email is required'
        if (!password.trim()) newErrors.password = 'Password is required'
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
            if (data.success) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                toast.success('Logged in successfully!')
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='bg-gray-50 px-4 pt-2 pb-8'>
            <div className='w-full max-w-md mx-auto'>
                <form onSubmit={onSubmitHandler} className='bg-white rounded-lg shadow-md border p-6'>
                    {/* Header Section */}
                    <div className='text-center mb-6'>
                        <h1 className='text-2xl font-semibold text-gray-900 mb-2'>Sign In</h1>
                        <p className='text-sm text-gray-600'>Enter your credentials to continue</p>
                    </div>

                    {/* Form Content */}
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Email *</label>
                            <input 
                                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.email ? 'border-red-300' : 'border-gray-300'
                                }`}
                                type="email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email} 
                                required 
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Password *</label>
                            <div className='relative'>
                                <input 
                                    className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${
                                        errors.password ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    type={showPassword ? "text" : "password"} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password} 
                                    required 
                                    placeholder="Enter your password"
                                    minLength="6"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <button 
                            type="submit" 
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors mt-6'
                        >
                            Sign In
                        </button>

                        <div className='text-center mt-6'>
                            <p className='text-sm text-gray-600'>
                                Don't have an account? 
                                <Link 
                                    to="/signup" 
                                    className='text-blue-600 hover:text-blue-700 font-medium ml-1'
                                >
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
