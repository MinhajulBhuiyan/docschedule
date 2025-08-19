import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'

const Login = () => {
    const location = useLocation()
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [emergencyContact, setEmergencyContact] = useState('')
    const [address, setAddress] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    const { backendUrl, setToken } = useContext(AppContext)

    // Check URL parameter to determine initial state
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const mode = urlParams.get('mode')
        if (mode === 'signup') {
            setState('Sign Up')
        } else {
            setState('Login')
        }
    }, [location])

    const resetForm = () => {
        setName('')
        setEmail('')
        setPassword('')
        setPhone('')
        setDateOfBirth('')
        setGender('')
        setBloodGroup('')
        setEmergencyContact('')
        setAddress('')
        setConfirmPassword('')
        setErrors({})
    }

    const handleStateChange = (newState) => {
        setState(newState)
        resetForm()
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (state === 'Sign Up') {
            if (!name.trim()) newErrors.name = 'Name is required'
            if (!phone.trim()) newErrors.phone = 'Phone number is required'
            if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
            if (!gender) newErrors.gender = 'Gender is required'
            if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'
            if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
        }
        
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
            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/user/register', { 
                    name, 
                    email, 
                    password, 
                    phone, 
                    dateOfBirth, 
                    gender, 
                    bloodGroup, 
                    emergencyContact, 
                    address 
                })
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    toast.success('Account created successfully!')
                    navigate('/') // redirect only after success
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    toast.success('Logged in successfully!')
                    navigate('/') // redirect only after success
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4'>
            <div className='relative w-full max-w-2xl'>
                {/* Background decorative elements */}
                <div className='absolute -top-4 -left-4 w-24 h-24 bg-blue-300 rounded-full opacity-30 blur-xl'></div>
                <div className='absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-30 blur-xl'></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 blur-2xl'></div>
                
                <form onSubmit={onSubmitHandler} className='relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>
                    {/* Header Section */}
                    <div className='bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 p-8 text-white text-center relative overflow-hidden'>
                        <div className='absolute inset-0 bg-black/10'></div>
                        <div className='relative z-10'>
                            <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                {state === 'Sign Up' ? (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                ) : (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                )}
                            </div>
                            <h1 className='text-3xl font-bold mb-2'>
                                {state === 'Sign Up' ? "Create Account" : "Welcome Back"}
                            </h1>
                            <p className='text-blue-100 text-lg'>
                                {state === 'Sign Up' ? "Join us for better healthcare" : "Sign in to your account"}
                            </p>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className='p-8 space-y-6'>
                        <p className='text-center text-gray-600 mb-6'>
                            {state === 'Sign Up' ? "Fill in your details to get started" : "Enter your credentials to continue"}
                        </p>

                        {state === 'Sign Up' && (
                    <>
                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Full Name *
                                </label>
                                <input 
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                    type="text" 
                                    onChange={(e) => setName(e.target.value)} 
                                    value={name} 
                                    required 
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                            </div>

                            <div className='space-y-2'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Phone Number *
                                </label>
                                <input 
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                    type="tel" 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    value={phone} 
                                    required 
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Date of Birth *
                                </label>
                                <input 
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.dateOfBirth ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                    type="date" 
                                    onChange={(e) => setDateOfBirth(e.target.value)} 
                                    value={dateOfBirth} 
                                    required 
                                />
                                {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>}
                            </div>

                            <div className='space-y-2'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Gender *
                                </label>
                                <select 
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.gender ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                    onChange={(e) => setGender(e.target.value)} 
                                    value={gender} 
                                    required
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                            </div>
                        </div>

                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Blood Group
                                </label>
                                <select 
                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                    onChange={(e) => setBloodGroup(e.target.value)} 
                                    value={bloodGroup}
                                >
                                    <option value="">Select blood group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div className='space-y-2'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    Emergency Contact
                                </label>
                                <input 
                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                    type="tel" 
                                    onChange={(e) => setEmergencyContact(e.target.value)} 
                                    value={emergencyContact} 
                                    placeholder="Emergency contact number"
                                />
                            </div>
                        </div>

                        <div className='w-full space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Address
                            </label>
                            <textarea 
                                className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none' 
                                rows="3"
                                onChange={(e) => setAddress(e.target.value)} 
                                value={address} 
                                placeholder="Enter your address"
                            />
                        </div>
                    </>
                )}

                <div className='w-full space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                        <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        Email *
                    </label>
                    <input 
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                        }`}
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        required 
                        placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>

                <div className='w-full space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                        <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Password *
                    </label>
                    <input 
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                        }`}
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        required 
                        placeholder="Enter your password"
                        minLength="6"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>

                {state === 'Sign Up' && (
                    <div className='w-full space-y-2'>
                        <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                            <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Confirm Password *
                        </label>
                        <input 
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'
                            }`}
                            type="password" 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            value={confirmPassword} 
                            required 
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                    </div>
                )}

                {/* Submit Button */}
                <div className='pt-4'>
                    <button 
                        type="submit" 
                        className='w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
                    >
                        {state === 'Sign Up' ? "Create Account" : "Sign In"}
                    </button>
                </div>

                                {/* Toggle between Login/Signup */}
                <div className='text-center pt-4'>
                    {state === 'Sign Up' 
                        ? (
                            <p className='text-gray-600'>
                                Already have an account? 
                                <span onClick={() => handleStateChange('Login')} className='text-blue-700 hover:text-blue-800 font-semibold cursor-pointer ml-1 transition-colors duration-200'>
                                    Sign in here
                                </span>
                            </p>
                        ) : (
                            <p className='text-gray-600'>
                                Don't have an account? 
                                <span onClick={() => handleStateChange('Sign Up')} className='text-blue-700 hover:text-blue-800 font-semibold cursor-pointer ml-1 transition-colors duration-200'>
                                    Create one here
                                </span>
                            </p>
                        )
                    }
                </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
