import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from "../assets/assets_frontend/assets";
import { motion } from 'framer-motion';

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('Image size should be less than 5MB');
                return;
            }
            setImage(file);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return userData ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            My <span className="text-blue-200">Profile</span>
                        </h1>
                        <p className="text-xl text-blue-100">
                            Manage your personal information and preferences
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 border-b border-gray-100">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Profile Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                {isEdit ? (
                                    <label htmlFor='image' className="cursor-pointer group">
                                        <div className='relative'>
                                            <img 
                                                className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl group-hover:opacity-80 transition-opacity duration-300' 
                                                src={image ? URL.createObjectURL(image) : userData.image} 
                                                alt="Profile" 
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <img className='w-8 h-8' src={assets.upload_icon} alt="Upload" />
                                            </div>
                                        </div>
                                        <input onChange={handleImageChange} type="file" id="image" hidden accept="image/*" />
                                    </label>
                                ) : (
                                    <img 
                                        className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl' 
                                        src={userData.image} 
                                        alt="Profile" 
                                    />
                                )}
                            </motion.div>

                            {/* Profile Info */}
                            <div className="flex-1 text-center md:text-left">
                                {isEdit ? (
                                    <input 
                                        className='bg-white text-3xl font-bold text-gray-800 px-4 py-2 rounded-xl border-2 border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center md:text-left w-full md:w-auto' 
                                        type="text" 
                                        onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                        value={userData.name} 
                                    />
                                ) : (
                                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>{userData.name}</h2>
                                )}
                                <p className="text-blue-600 font-medium text-lg">{userData.email}</p>
                                
                                {/* Action Buttons */}
                                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                                    {isEdit ? (
                                        <>
                                            <button 
                                                onClick={updateUserProfileData}
                                                disabled={isLoading}
                                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isLoading ? 'Saving...' : 'Save Changes'}
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setIsEdit(false);
                                                    setImage(false);
                                                    loadUserProfileData(); // Reset to original data
                                                }}
                                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl transition-all duration-300"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            onClick={() => setIsEdit(true)}
                                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="bg-blue-50 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Contact Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-blue-600 font-semibold min-w-[80px]">Email:</span>
                                            <span className="text-gray-700">{userData.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-blue-600 font-semibold min-w-[80px]">Phone:</span>
                                            {isEdit ? (
                                                <input 
                                                    className="flex-1 bg-white px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                                                    type="tel" 
                                                    onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                                    value={userData.phone} 
                                                />
                                            ) : (
                                                <span className="text-gray-700">{userData.phone}</span>
                                            )}
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-blue-600 font-semibold min-w-[80px]">Address:</span>
                                            {isEdit ? (
                                                <div className="flex-1 space-y-2">
                                                    <input 
                                                        className="w-full bg-white px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                                                        type="text" 
                                                        placeholder="Address Line 1"
                                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                                        value={userData.address?.line1 || ''} 
                                                    />
                                                    <input 
                                                        className="w-full bg-white px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                                                        type="text" 
                                                        placeholder="Address Line 2"
                                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                                        value={userData.address?.line2 || ''} 
                                                    />
                                                </div>
                                            ) : (
                                                <div className="text-gray-700">
                                                    <p>{userData.address?.line1 || 'Not specified'}</p>
                                                    <p>{userData.address?.line2 || ''}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Basic Information */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="space-y-6"
                            >
                                <div className="bg-purple-50 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Basic Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-purple-600 font-semibold min-w-[80px]">Gender:</span>
                                            {isEdit ? (
                                                <select 
                                                    className="flex-1 bg-white px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                                    value={userData.gender} 
                                                >
                                                    <option value="Not Selected">Not Selected</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            ) : (
                                                <span className="text-gray-700">{userData.gender || 'Not specified'}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-purple-600 font-semibold min-w-[80px]">Birthday:</span>
                                            {isEdit ? (
                                                <input 
                                                    className="flex-1 bg-white px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                                                    type='date' 
                                                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                                    value={userData.dob || ''} 
                                                />
                                            ) : (
                                                <span className="text-gray-700">{formatDate(userData.dob)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Account Stats */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Account Overview
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-white rounded-xl">
                                            <div className="text-2xl font-bold text-blue-600">Active</div>
                                            <div className="text-sm text-gray-600">Account Status</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-xl">
                                            <div className="text-2xl font-bold text-green-600">Member</div>
                                            <div className="text-sm text-gray-600">Since {new Date().getFullYear()}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading profile...</p>
            </div>
        </div>
    )
}

export default MyProfile