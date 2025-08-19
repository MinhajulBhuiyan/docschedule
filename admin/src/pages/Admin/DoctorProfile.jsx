import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { FaUserMd, FaStethoscope, FaCheckCircle, FaTimesCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGraduationCap, FaCalendarAlt, FaArrowLeft } from "react-icons/fa"
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { doctorId } = useParams()
  const navigate = useNavigate()
  const { doctors, aToken } = useContext(AdminContext)
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (aToken && doctors.length > 0) {
      const foundDoctor = doctors.find(doc => doc._id === doctorId)
      if (foundDoctor) {
        setDoctor(foundDoctor)
      } else {
        toast.error('Doctor not found')
        navigate('/doctor-list')
      }
      setLoading(false)
    }
  }, [doctorId, doctors, aToken, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-600">Doctor not found</h2>
        <button 
          onClick={() => navigate('/doctor-list')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Doctors List
        </button>
      </div>
    )
  }

  return (
    <div className="m-6 max-h-[90vh] overflow-y-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/doctor-list')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <FaArrowLeft /> Back to Doctors List
      </button>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Doctor Image */}
          <div className="relative">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{doctor.name}</h1>
            <p className="text-blue-100 text-xl mb-3">{doctor.degree}</p>
            <div className="flex items-center gap-4 text-blue-100">
              <span className="flex items-center gap-2">
                <FaStethoscope /> {doctor.speciality}
              </span>
              <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                doctor.available 
                  ? 'bg-green-500/20 text-green-100' 
                  : 'bg-red-500/20 text-red-100'
              }`}>
                {doctor.available ? <FaCheckCircle /> : <FaTimesCircle />}
                {doctor.available ? 'Available' : 'Not Available'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Personal & Professional Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaUserMd className="text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaPhone className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-800">{doctor.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaEnvelope className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">{doctor.email || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaMapMarkerAlt className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-800">{doctor.location || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaGraduationCap className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-semibold text-gray-800">{doctor.experience || 'Not specified'} years</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaStethoscope className="text-blue-600" />
              Professional Details
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Speciality</h4>
                <p className="text-blue-700">{doctor.speciality}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Degree</h4>
                <p className="text-green-700">{doctor.degree}</p>
              </div>
              {doctor.description && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">About</h4>
                  <p className="text-gray-700 leading-relaxed">{doctor.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Read-only Status */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Current Status</h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${
                doctor.available 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2">
                  {doctor.available ? <FaCheckCircle className="text-green-600" /> : <FaTimesCircle className="text-red-600" />}
                  <span className={`font-semibold ${
                    doctor.available ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {doctor.available ? 'Available for Appointments' : 'Not Accepting Patients'}
                  </span>
                </div>
                <p className={`text-sm mt-2 ${
                  doctor.available ? 'text-green-600' : 'text-red-600'
                }`}>
                  {doctor.available 
                    ? 'Patients can book appointments with this doctor' 
                    : 'Doctor is currently unavailable for new appointments'
                  }
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" />
                  <span className="font-semibold text-blue-800">Joined Platform</span>
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  {new Date(doctor.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
            <div className="space-y-3">
              {doctor.phone && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaPhone className="text-blue-600" />
                  <span className="text-gray-700">{doctor.phone}</span>
                </div>
              )}
              {doctor.email && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-blue-600" />
                  <span className="text-gray-700">{doctor.email}</span>
                </div>
              )}
              {doctor.location && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <span className="text-gray-700">{doctor.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
