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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-center w-full">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden mx-auto">

          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 h-48">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                src={profileData.image}
                alt="Doctor Avatar"
              />
            </div>
            <div className="absolute top-6 right-8">
              {
                isEdit ? (
                  <button
                    onClick={updateProfile}
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-base font-medium"
                  >
                    <FaCheckCircle size={18} /> Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEdit(prev => !prev)}
                    className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all flex items-center gap-2 text-base"
                  >
                    <FaEdit size={18} /> Edit Profile
                  </button>
                )
              }
            </div>
          </div>

          <div className="px-8 py-6 pt-20">
            {/* Name and Basic Info - Centered */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-800 mb-3">
                {profileData.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{profileData.degree} • {profileData.speciality}</p>
              <span className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-base font-medium">
                {profileData.experience}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* About Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-3">
                    <FaInfoCircle className="text-blue-500" size={20} /> About
                  </h3>
                  <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                    {isEdit ? (
                      <textarea
                        onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                        value={profileData.about}
                        rows={5}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none text-base"
                        placeholder="Enter about information..."
                      />
                    ) : (
                      <p className="text-gray-600 text-base leading-relaxed">{profileData.about}</p>
                    )}
                  </div>
                </div>

                {/* Appointment Fee */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Appointment Fee</h3>
                  <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                    <span className="text-blue-600 font-bold text-2xl">
                      {currency} {isEdit ? (
                        <input
                          type="number"
                          value={profileData.fees}
                          onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                          className="ml-2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-lg w-32"
                        />
                      ) : profileData.fees}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Address Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-3">
                    <FaMapMarkerAlt className="text-red-500" size={20} /> Address
                  </h3>
                  <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                    {isEdit ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={profileData.address.line1}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            address: { ...prev.address, line1: e.target.value }
                          }))}
                          className="block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                          placeholder="Address Line 1"
                        />
                        <input
                          type="text"
                          value={profileData.address.line2}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            address: { ...prev.address, line2: e.target.value }
                          }))}
                          className="block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                          placeholder="Address Line 2"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-600 text-base leading-relaxed">
                        {profileData.address.line1}<br />{profileData.address.line2}
                      </p>
                    )}
                  </div>
                </div>

                {/* Availability Toggle */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Availability</h3>
                  <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                        checked={profileData.available}
                        className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-400"
                        disabled={!isEdit}
                      />
                      <label className="text-gray-600 text-base">Available for Appointments</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
