import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from '../../assets/assets_frontend/assets'

const Doctors = () => {
  const [searchParams] = useSearchParams()
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpeciality, setSelectedSpeciality] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  // Mock doctors data (replace with API call)
  const mockDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      speciality: "Cardiologist",
      location: "New York, NY",
      rating: 4.9,
      experience: "15 years",
      image: assets.doc1,
      available: true,
      nextSlot: "Today, 2:00 PM",
      consultationFee: "$150"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      speciality: "Dermatologist",
      location: "Los Angeles, CA",
      rating: 4.8,
      experience: "12 years",
      image: assets.doc2,
      available: true,
      nextSlot: "Tomorrow, 10:00 AM",
      consultationFee: "$120"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      speciality: "Pediatrician",
      location: "Chicago, IL",
      rating: 4.7,
      experience: "18 years",
      image: assets.doc3,
      available: true,
      nextSlot: "Today, 4:00 PM",
      consultationFee: "$100"
    },
    {
      id: 4,
      name: "Dr. David Thompson",
      speciality: "Neurologist",
      location: "Boston, MA",
      rating: 4.9,
      experience: "20 years",
      image: assets.doc4,
      available: false,
      nextSlot: "Next Week",
      consultationFee: "$200"
    },
    {
      id: 5,
      name: "Dr. Lisa Wang",
      speciality: "Gynecologist",
      location: "San Francisco, CA",
      rating: 4.6,
      experience: "14 years",
      image: assets.doc5,
      available: true,
      nextSlot: "Today, 1:00 PM",
      consultationFee: "$130"
    },
    {
      id: 6,
      name: "Dr. James Wilson",
      speciality: "Orthopedic Surgeon",
      location: "Miami, FL",
      rating: 4.8,
      experience: "16 years",
      image: assets.doc6,
      available: true,
      nextSlot: "Tomorrow, 3:00 PM",
      consultationFee: "$180"
    }
  ]

  // Specialities for filtering
  const specialities = [
    "All Specialities",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gynecologist",
    "Orthopedic Surgeon",
    "Psychiatrist",
    "Oncologist",
    "Gastroenterologist"
  ]

  // Locations for filtering
  const locations = [
    "All Locations",
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Boston, MA",
    "San Francisco, CA",
    "Miami, FL",
    "Seattle, WA",
    "Denver, CO"
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctors(mockDoctors)
      setFilteredDoctors(mockDoctors)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // Get search term from URL params
    const search = searchParams.get('search')
    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams])

  useEffect(() => {
    // Filter doctors based on search and filters
    let filtered = doctors

    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedSpeciality && selectedSpeciality !== 'All Specialities') {
      filtered = filtered.filter(doctor => doctor.speciality === selectedSpeciality)
    }

    if (selectedLocation && selectedLocation !== 'All Locations') {
      filtered = filtered.filter(doctor => doctor.location === selectedLocation)
    }

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience)
        case 'name':
          return a.name.localeCompare(b.name)
        case 'fee':
          return parseInt(a.consultationFee.replace('$', '')) - parseInt(b.consultationFee.replace('$', ''))
        default:
          return 0
      }
    })

    setFilteredDoctors(filtered)
  }, [doctors, searchTerm, selectedSpeciality, selectedLocation, sortBy])

  const handleBookAppointment = (doctorId) => {
    // Navigate to appointment booking page
    window.location.href = `/appointment/${doctorId}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading doctors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Doctor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced healthcare professionals in your area. 
            Book appointments, read reviews, and get the care you deserve.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Doctors
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, speciality, or location..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Speciality Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speciality
              </label>
              <select
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
              >
                {specialities.map((speciality) => (
                  <option key={speciality} value={speciality}>
                    {speciality}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="rating">Rating</option>
                <option value="experience">Experience</option>
                <option value="name">Name</option>
                <option value="fee">Consultation Fee</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        {filteredDoctors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters to find more results.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedSpeciality('')
                setSelectedLocation('')
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Doctor Image and Status */}
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      doctor.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>

                {/* Doctor Information */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {doctor.name}
                  </h3>
                  
                  <p className="text-blue-600 font-semibold mb-2">
                    {doctor.speciality}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(doctor.rating) 
                              ? 'text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {doctor.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📍</span>
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">⏱️</span>
                      <span>{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">💰</span>
                      <span>{doctor.consultationFee} consultation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📅</span>
                      <span>Next: {doctor.nextSlot}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleBookAppointment(doctor.id)}
                      disabled={!doctor.available}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        doctor.available
                          ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {doctor.available ? 'Book Appointment' : 'Unavailable'}
                    </button>
                    
                    <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredDoctors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
              Load More Doctors
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Doctors
