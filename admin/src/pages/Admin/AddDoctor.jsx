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
        <form onSubmit={onSubmitHandler} className='m-5 w-full flex justify-center'>

            <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl mb-5'>
                <h1 className='text-2xl font-bold'>Add Doctor</h1>
                <p className='text-blue-100 mt-1'>Create a new doctor profile by filling out the details below.</p>
            </div>

            <div className='bg-white border border-gray-100 rounded-2xl shadow-lg p-6 w-full max-w-5xl mx-auto'>
                <div className='mb-8'>
                    <p className='text-sm font-semibold text-gray-700 mb-2'>Profile Photo</p>
                    <label htmlFor="doc-img" className='block'>
                        <div className='flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/30 hover:bg-blue-50 transition-colors cursor-pointer'>
                            <img className='w-16 h-16 rounded-full object-cover bg-gray-100' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="upload" />
                            <div>
                                <p className='text-gray-700 font-medium'>Click to upload</p>
                                <p className='text-xs text-gray-500'>PNG or JPG up to 5MB</p>
                            </div>
                        </div>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" accept='image/*' hidden />
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-gray-700'>Full Name</p>
                            <input onChange={e => setName(e.target.value)} value={name} className='border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter full name' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-gray-700'>Email</p>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" placeholder='doctor@email.com' required />
                        </div>


                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-gray-700'>Password</p>
                            <div className='relative'>
                                <input onChange={e => setPassword(e.target.value)} value={password} className='w-full border rounded-xl px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500' type={showPassword ? 'text' : 'password'} placeholder='Set a strong password' required />
                                <button type='button' onClick={() => setShowPassword(v => !v)} className='absolute inset-y-0 right-2 px-2 text-xs font-medium text-blue-700 hover:text-blue-900'>
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <p className='text-xs text-gray-500 mt-1'>Minimum 8 characters recommended.</p>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-gray-700'>Experience</p>
                            <select onChange={e => setExperience(e.target.value)} value={experience} className='border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' >
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

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-gray-700'>Fees</p>
                            <input onChange={e => setFees(e.target.value)} value={fees} className='border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="number" placeholder='Consultation fees' required />
                        </div>

                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-gray-700'>Speciality</p>
                            <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>


                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-gray-700'>Degree</p>
                            <input onChange={e => setDegree(e.target.value)} value={degree} className='border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='e.g. MBBS, MD' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-gray-700'>Address</p>
                            <input onChange={e => setAddress1(e.target.value)} value={address1} className='border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Street, area' required />
                            <input onChange={e => setAddress2(e.target.value)} value={address2} className='mt-2 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='City, state, ZIP' required />
                        </div>

                    </div>

                </div>

                <div>
                    <p className='mt-4 mb-2 text-sm font-semibold text-gray-700'>About Doctor</p>
                    <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500' rows={5} placeholder='Write a short bio...'></textarea>
                </div>

                <button type='submit' className='px-8 py-3 mt-4 text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg'>Add Doctor</button>

            </div>


        </form>
    )
}

export default AddDoctor