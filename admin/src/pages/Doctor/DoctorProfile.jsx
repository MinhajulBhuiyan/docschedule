import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FaUserMd, FaMapMarkerAlt, FaInfoCircle, FaCheckCircle, FaEdit } from "react-icons/fa"

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }

      setIsEdit(false)
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8 flex justify-center">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">

        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-40 flex items-end">
          <div className="absolute -bottom-16 left-10">
            <img
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
              src={profileData.image}
              alt="Doctor Avatar"
            />
          </div>
        </div>

        <div className="p-10 pt-20">
          {/* Name and Basic Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserMd className="text-blue-600" />
                {profileData.name}
              </h1>
              <p className="text-gray-500 mt-1">{profileData.degree} • {profileData.speciality}</p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 mt-2 rounded-full text-sm font-medium shadow-sm">
                {profileData.experience}
              </span>
            </div>

            <div className="flex gap-3">
              {
                isEdit ? (
                  <button
                    onClick={updateProfile}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    <FaCheckCircle /> Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEdit(prev => !prev)}
                    className="px-6 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 transition-all flex items-center gap-2"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                )
              }
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaInfoCircle className="text-indigo-500" /> About
            </h2>
            <div className="mt-2 text-gray-600 leading-relaxed bg-gray-50 border border-gray-200 p-4 rounded-lg">
              {isEdit ? (
                <textarea
                  onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                  value={profileData.about}
                  rows={6}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                />
              ) : (
                <p>{profileData.about}</p>
              )}
            </div>
          </div>

          {/* Appointment Fee */}
          <div className="mt-6">
            <p className="text-gray-700 font-semibold">
              Appointment Fee:
              <span className="ml-2 text-blue-600 font-bold">
                {currency} {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                    className="ml-2 border rounded px-2 py-1 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                ) : profileData.fees}
              </span>
            </p>
          </div>

          {/* Address Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> Address
            </h2>
            <div className="mt-2 text-gray-600 bg-gray-50 border border-gray-200 p-4 rounded-lg">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))}
                    className="block w-full border rounded-lg px-3 py-2 mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))}
                    className="block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </>
              ) : (
                <p>
                  {profileData.address.line1}<br />{profileData.address.line2}
                </p>
              )}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="mt-6 flex items-center gap-3">
            <input
              type="checkbox"
              onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
              checked={profileData.available}
              className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-400"
            />
            <label className="text-gray-700 font-medium">Available for Appointments</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
