import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    return (
        <div className='p-6 max-w-4xl mx-auto'>
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-gray-900'>Add Doctor</h1>
                <p className='text-gray-600 mt-1'>Create a new doctor profile</p>
            </div>

            <form onSubmit={onSubmitHandler} className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Profile Photo</label>
                    <label htmlFor="doc-img" className='block'>
                        <div className='flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer'>
                            <img className='w-12 h-12 rounded-full object-cover bg-gray-100' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="upload" />
                            <div>
                                <p className='text-sm text-gray-700'>Click to upload photo</p>
                                <p className='text-xs text-gray-500'>PNG or JPG</p>
                            </div>
                        </div>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" accept='image/*' hidden />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                            <input 
                                onChange={e => setName(e.target.value)} 
                                value={name} 
                                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                type="text" 
                                placeholder='Enter full name' 
                                required 
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                            <input 
                                onChange={e => setEmail(e.target.value)} 
                                value={email} 
                                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                type="email" 
                                placeholder='doctor@email.com' 
                                required 
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                            <div className='relative'>
                                <input 
                                    onChange={e => setPassword(e.target.value)} 
                                    value={password} 
                                    className='w-full border border-gray-300 rounded-lg px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder='Password' 
                                    required 
                                />
                                <button 
                                    type='button' 
                                    onClick={() => setShowPassword(v => !v)} 
                                    className='absolute inset-y-0 right-2 px-2 text-xs text-gray-500 hover:text-gray-700'
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Experience</label>
                            <select 
                                onChange={e => setExperience(e.target.value)} 
                                value={experience} 
                                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Years</option>
                                <option value="3 Year">3 Years</option>
                                <option value="4 Year">4 Years</option>
                                <option value="5 Year">5 Years</option>
                                <option value="6 Year">6 Years</option>
                                <option value="8 Year">8 Years</option>
                                <option value="9 Year">9 Years</option>
                                <option value="10 Year">10 Years</option>
                                <option value="11 Year">11 Years</option>
                                <option value="12 Year">12 Years</option>
                                <option value="13 Year">13 Years</option>
                                <option value="14 Year">14 Years</option>
                                <option value="15 Year">15 Years</option>
                                <option value="16 Year">16 Years</option>
                                <option value="17 Year">17 Years</option>
                                <option value="18 Year">18 Years</option>
                                <option value="19 Year">19 Years</option>
                                <option value="20 Year">20 Years</option>
                                <option value="20+ Year">20+ Years</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Consultation Fees</label>
                            <input 
                                onChange={e => setFees(e.target.value)} 
                                value={fees} 
                                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                type="number" 
                                placeholder='Enter fees' 
                                required 
                            />
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Speciality</label>
                            <select 
                                onChange={e => setSpeciality(e.target.value)} 
                                value={speciality} 
                                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            >
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Degree</label>
                            <input 
                                onChange={e => setDegree(e.target.value)} 
                                value={degree} 
                                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                type="text" 
                                placeholder='e.g. MBBS, MD' 
                                required 
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
                            <input 
                                onChange={e => setAddress1(e.target.value)} 
                                value={address1} 
                                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2' 
                                type="text" 
                                placeholder='Street, area' 
                                required 
                            />
                            <input 
                                onChange={e => setAddress2(e.target.value)} 
                                value={address2} 
                                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                type="text" 
                                placeholder='City, state, ZIP' 
                                required 
                            />
                        </div>
                    </div>
                </div>

                <div className='mt-6'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>About Doctor</label>
                    <textarea 
                        onChange={e => setAbout(e.target.value)} 
                        value={about} 
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        rows={4} 
                        placeholder='Brief description about the doctor...'
                    ></textarea>
                </div>

                <div className='mt-6 flex gap-3'>
                    <button 
                        type='submit' 
                        className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                    >
                        Add Doctor
                    </button>
                    <button 
                        type='button' 
                        onClick={() => {
                            setDocImg(false);
                            setName('');
                            setEmail('');
                            setPassword('');
                            setExperience('1 Year');
                            setFees('');
                            setAbout('');
                            setSpeciality('General physician');
                            setDegree('');
                            setAddress1('');
                            setAddress2('');
                        }}
                        className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor