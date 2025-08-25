import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [image, setImage] = useState(null)

    const navigate = useNavigate()
    const { backendUrl, setToken } = useContext(AppContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        // Simple validation for password match
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        // Simple validation for password length
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        try {
            // First, let's try without image upload to get the basic registration working
            if (image) {
                // If image is selected, use FormData
                const formData = new FormData()
                formData.append('name', name)
                formData.append('email', email)
                formData.append('password', password)
                formData.append('phone', phone)
                formData.append('dateOfBirth', dateOfBirth)
                formData.append('gender', gender)
                formData.append('address', JSON.stringify({ line1: addressLine1, line2: addressLine2 }))
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/user/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    toast.success('Account created successfully!')
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            } else {
                // If no image, use regular JSON
                const { data } = await axios.post(backendUrl + '/api/user/register', {
                    name,
                    email,
                    password,
                    phone,
                    dateOfBirth,
                    gender,
                    address: { line1: addressLine1, line2: addressLine2 }
                })
                
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    toast.success('Account created successfully!')
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 py-2 px-3'>
            <div className='w-full max-w-2xl'>
                <form onSubmit={onSubmitHandler} className='bg-white rounded-lg shadow-md border p-4 sm:p-6'>
                    {/* Header Section */}
                    <div className='text-center mb-4'>
                        <h1 className='text-2xl font-semibold text-gray-900 mb-1'>Create Account</h1>
                        <p className='text-sm text-gray-600'>Fill in your details to get started</p>
                    </div>

                    {/* Form Content */}
                    <div className='space-y-4'>
                        {/* Image Upload Section */}
                        <div className='text-center'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Profile Picture</label>
                            <div className='flex flex-col items-center'>
                                <div className='w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-2 overflow-hidden'>
                                    {image ? (
                                        <img 
                                            src={URL.createObjectURL(image)} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label 
                                    htmlFor="image-upload" 
                                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm transition-colors"
                                >
                                    Choose Photo
                                </label>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name *</label>
                                <input 
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    type="text" 
                                    onChange={(e) => setName(e.target.value)} 
                                    value={name} 
                                    required 
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number *</label>
                                <input 
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    type="tel" 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    value={phone} 
                                    required 
                                    placeholder="Phone number"
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Date of Birth *</label>
                                <input 
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    type="date" 
                                    onChange={(e) => setDateOfBirth(e.target.value)} 
                                    value={dateOfBirth} 
                                    required 
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Gender *</label>
                                <select 
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    onChange={(e) => setGender(e.target.value)} 
                                    value={gender} 
                                    required
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Email *</label>
                            <input 
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                type="email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email} 
                                required 
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
                            <div className='space-y-2'>
                                <input 
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                    type="text"
                                    onChange={(e) => setAddressLine1(e.target.value)} 
                                    value={addressLine1} 
                                    placeholder="Address Line 1"
                                />
                                <input 
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                    type="text"
                                    onChange={(e) => setAddressLine2(e.target.value)} 
                                    value={addressLine2} 
                                    placeholder="Address Line 2 (Optional)"
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Password *</label>
                                <div className='relative'>
                                    <input 
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10'
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
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Confirm Password *</label>
                                <div className='relative'>
                                    <input 
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10'
                                        type={showConfirmPassword ? "text" : "password"} 
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                        value={confirmPassword} 
                                        required 
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors mt-6'
                        >
                            Create Account
                        </button>

                        <div className='text-center mt-4'>
                            <p className='text-sm text-gray-600'>
                                Already have an account? 
                                <Link 
                                    to="/login" 
                                    className='text-blue-600 hover:text-blue-700 font-medium ml-1'
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
