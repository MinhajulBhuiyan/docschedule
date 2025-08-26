import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { FaHospital, FaSearch, FaFilter, FaEye, FaPlus, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"
import { toast } from 'react-toastify'

const DoctorsList = () => {
  const navigate = useNavigate()
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpeciality, setSelectedSpeciality] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [filteredDoctors, setFilteredDoctors] = useState([])

  // Match department colors with frontend for consistent visuals
  const specialtyColors = {
    'General Physician': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    'Gynecologist': { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100' },
    'Dermatologist': { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
    'Pediatricians': { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-100' },
    'Neurologist': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
    'Gastroenterologist': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' }
  }

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
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2 text-gray-900">
              <FaHospital className="text-blue-600" /> Doctors Directory
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage and monitor all registered doctors</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/add-doctor')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaPlus /> Add Doctor
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Speciality Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
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
            className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
          >
            {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
            {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </button>
        </div>

        {/* Results Count */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-gray-500 text-sm">Showing {filteredDoctors.length} of {doctors.length} doctors</p>
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No doctors found</h3>
          <p className="text-gray-500 mb-6 text-sm">
            {searchTerm || selectedSpeciality !== 'all' 
              ? 'Adjust your search or filters' 
              : 'No doctors have been registered yet'}
          </p>
          {!searchTerm && selectedSpeciality === 'all' && (
            <button
              onClick={() => navigate('/add-doctor')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <FaPlus /> Add First Doctor
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-60 bg-gray-50">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="object-contain w-full h-full p-2"
                />
                {/* Top badges */}
                <div className="absolute top-2 left-2">
                  {(() => {
                    const color = specialtyColors[doctor.speciality] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }
                    return (
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${color.bg} ${color.text} border ${color.border}`}>
                        {doctor.speciality}
                      </span>
                    )
                  })()}
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${doctor.available ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                {/* Name and Degree */}
                <h3 className="text-lg font-semibold text-gray-900 truncate">{doctor.name}</h3>
                <p className="text-gray-500 text-sm mb-3 truncate">{doctor.degree}</p>

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
                      <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:h-4 after:w-4 after:bg-white after:rounded-full after:left-[2px] after:top-[2px] after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewProfile(doctor._id)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEye /> View Profile
                  </button>
                  {/* Removed non-working Edit/Delete buttons */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal removed in revert */}

      {/* Footer Info */}
      <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaHospital className="text-blue-600" /> Platform Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-2xl font-semibold text-blue-700">{doctors.length}</div>
            <div className="text-xs text-gray-600">Total Doctors</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-2xl font-semibold text-green-700">{doctors.filter(d => d.available).length}</div>
            <div className="text-xs text-gray-600">Available</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-2xl font-semibold text-red-700">{doctors.filter(d => !d.available).length}</div>
            <div className="text-xs text-gray-600">Unavailable</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-2xl font-semibold text-purple-700">{new Set(doctors.map(d => d.speciality)).size}</div>
            <div className="text-xs text-gray-600">Specialities</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorsList
