import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [state, setState] = useState('Sign Up')
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
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-[500px] border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>
                    {state === 'Sign Up' ? "Create Account" : "Login"}
                </p>
                <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>

                {state === 'Sign Up' && (
                    <>
                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='w-full'>
                                <p>Full Name *</p>
                                <input 
                                    className={`border rounded w-full p-2 mt-1 ${errors.name ? 'border-red-500' : 'border-zinc-300'}`}
                                    type="text" 
                                    onChange={(e) => setName(e.target.value)} 
                                    value={name} 
                                    required 
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className='w-full'>
                                <p>Phone Number *</p>
                                <input 
                                    className={`border rounded w-full p-2 mt-1 ${errors.phone ? 'border-red-500' : 'border-zinc-300'}`}
                                    type="tel" 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    value={phone} 
                                    required 
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='w-full'>
                                <p>Date of Birth *</p>
                                <input 
                                    className={`border rounded w-full p-2 mt-1 ${errors.dateOfBirth ? 'border-red-500' : 'border-zinc-300'}`}
                                    type="date" 
                                    onChange={(e) => setDateOfBirth(e.target.value)} 
                                    value={dateOfBirth} 
                                    required 
                                />
                                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                            </div>

                            <div className='w-full'>
                                <p>Gender *</p>
                                <select 
                                    className={`border rounded w-full p-2 mt-1 ${errors.gender ? 'border-red-500' : 'border-zinc-300'}`}
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
                                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                            </div>
                        </div>

                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='w-full'>
                                <p>Blood Group</p>
                                <select 
                                    className='border border-zinc-300 rounded w-full p-2 mt-1' 
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

                            <div className='w-full'>
                                <p>Emergency Contact</p>
                                <input 
                                    className='border border-zinc-300 rounded w-full p-2 mt-1' 
                                    type="tel" 
                                    onChange={(e) => setEmergencyContact(e.target.value)} 
                                    value={emergencyContact} 
                                    placeholder="Emergency contact number"
                                />
                            </div>
                        </div>

                        <div className='w-full'>
                            <p>Address</p>
                            <textarea 
                                className='border border-zinc-300 rounded w-full p-2 mt-1' 
                                rows="3"
                                onChange={(e) => setAddress(e.target.value)} 
                                value={address} 
                                placeholder="Enter your address"
                            />
                        </div>
                    </>
                )}

                <div className='w-full'>
                    <p>Email *</p>
                    <input 
                        className={`border rounded w-full p-2 mt-1 ${errors.email ? 'border-red-500' : 'border-zinc-300'}`}
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        required 
                        placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className='w-full'>
                    <p>Password *</p>
                    <input 
                        className={`border rounded w-full p-2 mt-1 ${errors.password ? 'border-red-500' : 'border-zinc-300'}`}
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        required 
                        placeholder="Enter your password"
                        minLength="6"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {state === 'Sign Up' && (
                    <div className='w-full'>
                        <p>Confirm Password *</p>
                        <input 
                            className={`border rounded w-full p-2 mt-1 ${errors.confirmPassword ? 'border-red-500' : 'border-zinc-300'}`}
                            type="password" 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            value={confirmPassword} 
                            required 
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                )}

                <button 
                    type="submit" 
                    className='bg-primary text-white w-full py-2 rounded-md text-base'
                >
                    {state === 'Sign Up' ? "Create Account" : "Login"}
                </button>

                {state === 'Sign Up' 
                    ? <p>Already have an account? <span onClick={() => handleStateChange('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
                    : <p>Create a new account? <span onClick={() => handleStateChange('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login
