import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const navigate = useNavigate()
  const [filterDoc, setFilterDoc] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  // List of specialities with icons
  const categories = [
    { name: "General physician", icon: "👨‍⚕️", color: "blue" },
    { name: "Gynecologist", icon: "👩‍⚕️", color: "pink" },
    { name: "Dermatologist", icon: "🔬", color: "purple" },
    { name: "Pediatricians", icon: "👶", color: "green" },
    { name: "Neurologist", icon: "🧠", color: "indigo" },
    { name: "Gastroenterologist", icon: "🏥", color: "teal" }
  ]

  // Apply filters and sorting
  const applyFilters = () => {
    setLoading(true)
    let filtered = [...doctors]

    // Filter by speciality
    if (speciality) {
      filtered = filtered.filter(doc => doc.speciality === speciality)
      setSelectedCategory(speciality)
    } else if (selectedCategory) {
      filtered = filtered.filter(doc => doc.speciality === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.location && doc.location.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'experience':
          return (b.experience || 0) - (a.experience || 0)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'fee':
          return (a.fee || 0) - (b.fee || 0)
        default:
          return 0
      }
    })

    setFilterDoc(filtered)
    setTimeout(() => setLoading(false), 300)
  }

  useEffect(() => {
    applyFilters()
  }, [doctors, speciality, searchTerm, selectedCategory, sortBy])

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('')
      navigate('/doctors')
    } else {
      setSelectedCategory(category)
      navigate(`/doctors/${category}`)
    }
  }

  // Function to get category styles based on color
  const getCategoryStyles = (color) => {
    const styles = {
      blue: 'bg-blue-100 border-blue-300 text-blue-700',
      pink: 'bg-pink-100 border-pink-300 text-pink-700',
      purple: 'bg-purple-100 border-purple-300 text-purple-700',
      green: 'bg-green-100 border-green-300 text-green-700',
      indigo: 'bg-indigo-100 border-indigo-300 text-indigo-700',
      teal: 'bg-teal-100 border-teal-300 text-teal-700'
    }
    return styles[color] || 'bg-blue-100 border-blue-300 text-blue-700'
  }

  const DoctorCard = ({ doc, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={() => { navigate(`/appointment/${doc._id}`); scrollTo(0, 0) }}
      className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img 
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" 
          src={doc.image} 
          alt={doc.name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            doc.available 
              ? 'bg-green-500 text-white shadow-lg' 
              : 'bg-red-500 text-white shadow-lg'
          }`}>
            {doc.available ? 'Available' : 'Busy'}
          </span>
        </div>

        {/* Rating Badge */}
        {doc.rating && (
          <div className="absolute bottom-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            ⭐ {doc.rating}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Name & Speciality */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            {doc.name}
          </h3>
          <p className="text-blue-600 font-medium">{doc.speciality}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-gray-800">{doc.experience || 'N/A'}</p>
            <p className="text-xs text-gray-600">Years Exp</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-gray-800">{doc.fee ? `${currencySymbol}${doc.fee}` : 'Free'}</p>
            <p className="text-xs text-gray-600">Consultation</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 text-sm text-gray-600">
          {doc.location && (
            <div className="flex items-center gap-2">
              <span className="text-blue-500">📍</span>
              <span>{doc.location}</span>
            </div>
          )}
          {doc.reviews && (
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">💬</span>
              <span>{doc.reviews} reviews</span>
            </div>
          )}
        </div>

        {/* Book Appointment Button */}
        <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
          Book Appointment
        </button>
      </div>
    </motion.div>
  )

  const DoctorListCard = ({ doc, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={() => { navigate(`/appointment/${doc._id}`); scrollTo(0, 0) }}
      className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-center p-4">
        <img 
          className="w-20 h-20 rounded-full object-cover mr-4 group-hover:scale-105 transition-transform duration-300" 
          src={doc.image} 
          alt={doc.name} 
        />
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {doc.name}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              doc.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {doc.available ? 'Available' : 'Busy'}
            </span>
          </div>
          
          <p className="text-blue-600 font-medium mb-2">{doc.speciality}</p>
          
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>Exp: {doc.experience || 'N/A'} yrs</span>
            <span>Fee: {doc.fee ? `${currencySymbol}${doc.fee}` : 'Free'}</span>
            {doc.rating && <span>⭐ {doc.rating}</span>}
          </div>
        </div>
        
        <div className="text-right">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
            Book
          </button>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-2 text-center"
          >
            Find Your Perfect Doctor
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-center text-lg"
          >
            Browse through our network of qualified healthcare professionals
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Doctors</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, speciality, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="name">Name</option>
                <option value="experience">Experience</option>
                <option value="rating">Rating</option>
                <option value="fee">Fee</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">View</label>
              <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-4 py-3 transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-4 py-3 transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Specialities</h2>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                      (speciality === cat.name || selectedCategory === cat.name)
                        ? getCategoryStyles(cat.color)
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </div>
                  </button>
                ))}
              </div>

                        {/* Quick Stats */}
          <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              📊 Quick Stats
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="text-gray-600">Total Doctors:</span>
                <span className="font-bold text-blue-600">{doctors.length}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="text-gray-600">Available:</span>
                <span className="font-bold text-green-600">
                  {doctors.filter(doc => doc.available).length}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="text-gray-600">Filtered Results:</span>
                <span className="font-bold text-blue-600">{filterDoc.length}</span>
              </div>
            </div>
          </div>
            </div>
          </div>

          {/* Right - Doctor Cards/List */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedCategory || speciality ? `${selectedCategory || speciality} Doctors` : 'All Doctors'}
                  <span className="text-gray-500 font-normal ml-2">({filterDoc.length} results)</span>
                </h3>
                {(searchTerm || selectedCategory) && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Filters applied:</span>
                    {searchTerm && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Search: "{searchTerm}" ✕
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {selectedCategory} ✕
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('')
                    navigate('/doctors')
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-300 text-sm"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-72 bg-gray-300"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-16 bg-gray-300 rounded-xl"></div>
                        <div className="h-16 bg-gray-300 rounded-xl"></div>
                      </div>
                      <div className="h-10 bg-gray-300 rounded-xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Results */}
            <AnimatePresence>
              {!loading && (
                <>
                  {doctors.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                    >
                      <div className="text-6xl mb-4">🏥</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors available</h3>
                      <p className="text-gray-600 mb-6">
                        We're currently setting up our network of healthcare professionals. Please check back soon!
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {filterDoc.map((doc, index) => (
                            <DoctorCard key={doc._id} doc={doc} index={index} />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filterDoc.map((doc, index) => (
                            <DoctorListCard key={doc._id} doc={doc} index={index} />
                          ))}
                        </div>
                      )}

                      {filterDoc.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-20"
                        >
                          <div className="text-6xl mb-4">🔍</div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
                          <p className="text-gray-600 mb-6">
                            {searchTerm || selectedCategory 
                              ? `No doctors found for "${searchTerm || selectedCategory}". Try adjusting your search criteria.`
                              : 'No doctors available at the moment. Please check back later.'
                            }
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                              onClick={() => {
                                setSearchTerm('')
                                setSelectedCategory('')
                                navigate('/doctors')
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors duration-300"
                            >
                              View All Doctors
                            </button>
                            {searchTerm && (
                              <button
                                onClick={() => setSearchTerm('')}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl transition-colors duration-300"
                              >
                                Clear Search
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors
