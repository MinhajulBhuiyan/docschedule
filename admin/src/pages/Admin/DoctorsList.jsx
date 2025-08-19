import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { FaUserMd, FaStethoscope, FaCheckCircle, FaTimesCircle, FaHospital, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaPlus, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"
import { toast } from 'react-toastify'

const DoctorsList = () => {
  const navigate = useNavigate()
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpeciality, setSelectedSpeciality] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [filteredDoctors, setFilteredDoctors] = useState([])

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken, getAllDoctors])

  useEffect(() => {
    filterAndSortDoctors()
  }, [doctors, searchTerm, selectedSpeciality, sortBy, sortOrder])

  const filterAndSortDoctors = () => {
    let filtered = [...doctors]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.degree.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by speciality
    if (selectedSpeciality !== 'all') {
      filtered = filtered.filter(doctor => doctor.speciality === selectedSpeciality)
    }

    // Sort doctors
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === 'name' || sortBy === 'speciality' || sortBy === 'degree') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredDoctors(filtered)
  }

  const handleAvailabilityChange = async (docId) => {
    try {
      await changeAvailability(docId)
      toast.success('Availability updated successfully')
    } catch (error) {
      toast.error('Failed to update availability')
    }
  }

  const handleViewProfile = (doctorId) => {
    navigate(`/doctor-profile/${doctorId}`)
  }

  const handleEditDoctor = (doctorId) => {
    // previously opened edit modal; reverting to informational toast
    toast.info('Edit feature is currently unavailable')
  }

  const handleDeleteDoctor = (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor? This action cannot be undone.')) {
      toast.info('Delete functionality coming soon!')
    }
  }

  // Get unique specialities for filter
  const specialities = ['all', ...new Set(doctors.map(doctor => doctor.speciality))]

  return (
    <div className="m-6 max-h-[90vh] overflow-y-auto">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-wide flex items-center gap-3 mb-2">
              <FaHospital className="text-blue-200" /> Doctors Directory
            </h1>
            <p className="text-blue-100 text-lg">
              Manage and monitor all registered doctors in the platform
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/add-doctor')}
              className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <FaPlus /> Add New Doctor
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Speciality Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
            >
              {specialities.map((speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality === 'all' ? 'All Specialities' : speciality}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="speciality">Sort by Speciality</option>
              <option value="degree">Sort by Degree</option>
              <option value="available">Sort by Availability</option>
            </select>
          </div>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
            {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </button>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredDoctors.length}</span> of{' '}
            <span className="font-semibold text-gray-800">{doctors.length}</span> doctors
          </p>
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
          <FaUserMd className="text-gray-400 text-6xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-600 mb-2">No doctors found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedSpeciality !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'No doctors have been registered yet'
            }
          </p>
          {!searchTerm && selectedSpeciality === 'all' && (
            <button
              onClick={() => navigate('/add-doctor')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <FaPlus /> Add First Doctor
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden relative"
            >
              {/* Doctor Image */}
              <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Speciality Badge */}
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  {doctor.speciality}
                </span>
                
                {/* Availability Badge */}
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                  doctor.available 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {doctor.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Doctor Name and Degree */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FaUserMd className="text-blue-600" />
                  {doctor.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 italic">{doctor.degree}</p>

                {/* Quick Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaStethoscope className="text-blue-500" />
                    <span>{doctor.speciality}</span>
                  </div>
                  {doctor.experience && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaUserMd className="text-green-500" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                  )}
                </div>

                {/* Availability Toggle */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Availability</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={doctor.available}
                        onChange={() => handleAvailabilityChange(doctor._id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className={`text-xs mt-1 ${
                    doctor.available ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {doctor.available ? 'Accepting patients' : 'Not accepting patients'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewProfile(doctor._id)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaEye /> View Profile
                  </button>
                  <button
                    onClick={() => handleEditDoctor(doctor._id)}
                    className="px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-all duration-300"
                    title="Edit Doctor"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteDoctor(doctor._id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all duration-300"
                    title="Delete Doctor"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal removed in revert */}

      {/* Footer Info */}
      <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaHospital className="text-blue-600" />
          Platform Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-blue-600">{doctors.length}</div>
            <div className="text-sm text-gray-600">Total Doctors</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-green-600">
              {doctors.filter(d => d.available).length}
            </div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-red-600">
              {doctors.filter(d => !d.available).length}
            </div>
            <div className="text-sm text-gray-600">Unavailable</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-purple-600">
              {new Set(doctors.map(d => d.speciality)).size}
            </div>
            <div className="text-sm text-gray-600">Specialities</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorsList
