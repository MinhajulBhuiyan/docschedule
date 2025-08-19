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
    { name: "General Physician", icon: "🩺", color: "blue" },
    { name: "Gynecologist", icon: "👩‍⚕️", color: "pink" },
    { name: "Dermatologist", icon: "🧴", color: "green" },
    { name: "Pediatricians", icon: "👶", color: "yellow" },
    { name: "Neurologist", icon: "🧠", color: "purple" },
    { name: "Gastroenterologist", icon: "🫄", color: "indigo" }
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
      green: 'bg-green-100 border-green-300 text-green-700',
      yellow: 'bg-yellow-100 border-yellow-300 text-yellow-700',
      purple: 'bg-purple-100 border-purple-300 text-purple-700',
      indigo: 'bg-indigo-100 border-indigo-300 text-indigo-700'
    }
    return styles[color] || 'bg-blue-100 border-blue-300 text-blue-700'
  }

  const DoctorCard = ({ doc, index }) => {
    // Get category color and icon for styling
    const category = categories.find(cat => cat.name === doc.speciality);
    const categoryColor = category ? category.color : 'blue';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        onClick={() => { navigate(`/appointment/${doc._id}`); scrollTo(0, 0) }}
        className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 group relative"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img 
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" 
            src={doc.image} 
            alt={doc.name} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Speciality Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-2 rounded-full text-xs font-bold text-white shadow-lg bg-gradient-to-r ${
              categoryColor === 'blue' ? 'from-blue-500 to-blue-600' :
              categoryColor === 'pink' ? 'from-pink-500 to-pink-600' :
              categoryColor === 'green' ? 'from-green-500 to-green-600' :
              categoryColor === 'yellow' ? 'from-yellow-500 to-yellow-600' :
              categoryColor === 'purple' ? 'from-purple-500 to-purple-600' :
              categoryColor === 'indigo' ? 'from-indigo-500 to-indigo-600' :
              'from-blue-500 to-blue-600'
            }`}>
              {doc.speciality}
            </span>
          </div>
          
          {/* Availability Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 ${
              doc.available 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              <span className={`w-2 h-2 rounded-full ${doc.available ? 'bg-green-200' : 'bg-red-200'}`}></span>
              {doc.available ? 'Available' : 'Busy'}
            </span>
          </div>

          {/* Rating Badge */}
          {doc.rating && (
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
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
            <div className="flex items-center gap-2">
              <span className="text-lg">{category?.icon || '👨‍⚕️'}</span>
              <p className="text-blue-600 font-medium">{doc.speciality}</p>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className={`text-center p-3 rounded-xl border-2 transition-all duration-300 ${
              categoryColor === 'blue' ? 'bg-blue-50 border-blue-200' :
              categoryColor === 'pink' ? 'bg-pink-50 border-pink-200' :
              categoryColor === 'green' ? 'bg-green-50 border-green-200' :
              categoryColor === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
              categoryColor === 'purple' ? 'bg-purple-50 border-purple-200' :
              categoryColor === 'indigo' ? 'bg-indigo-50 border-indigo-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <p className="text-2xl font-bold text-gray-800">{doc.experience || 'N/A'}</p>
              <p className="text-xs text-gray-600 font-medium">Years Experience</p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 text-center p-3 rounded-xl">
              <p className="text-2xl font-bold text-gray-800">{doc.fee ? `${currencySymbol}${doc.fee}` : 'Free'}</p>
              <p className="text-xs text-gray-600 font-medium">Consultation Fee</p>
            </div>
          </div>

          {/* Additional Enhanced Info */}
          <div className="space-y-3 text-sm text-gray-600 mb-4">
            {doc.location && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <span className="text-blue-500 text-lg">📍</span>
                <span className="font-medium">{doc.location}</span>
              </div>
            )}
            {doc.reviews && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <span className="text-yellow-500 text-lg">💬</span>
                <span className="font-medium">{doc.reviews} patient reviews</span>
              </div>
            )}
            {doc.degree && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <span className="text-purple-500 text-lg">🎓</span>
                <span className="font-medium">{doc.degree}</span>
              </div>
            )}
          </div>

          {/* Book Appointment Button */}
          <button className={`w-full font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-white bg-gradient-to-r ${
            categoryColor === 'blue' ? 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' :
            categoryColor === 'pink' ? 'from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800' :
            categoryColor === 'green' ? 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' :
            categoryColor === 'yellow' ? 'from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800' :
            categoryColor === 'purple' ? 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' :
            categoryColor === 'indigo' ? 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800' :
            'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
          }`}>
            <span className="flex items-center justify-center gap-2">
              <span>📅</span>
              Book Appointment
            </span>
          </button>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    );
  };

  const DoctorListCard = ({ doc, index }) => {
    // Get category color and icon for styling
    const category = categories.find(cat => cat.name === doc.speciality);
    const categoryColor = category ? category.color : 'blue';
    
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        onClick={() => { navigate(`/appointment/${doc._id}`); scrollTo(0, 0) }}
        className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group relative"
      >
        <div className="flex items-center p-6">
          {/* Doctor Image with Speciality Badge */}
          <div className="relative mr-6">
            <img 
              className="w-24 h-24 rounded-full object-cover group-hover:scale-105 transition-transform duration-300 border-4 border-white shadow-lg" 
              src={doc.image} 
              alt={doc.name} 
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">{category?.icon || '👨‍⚕️'}</span>
            </div>
          </div>
          
          {/* Doctor Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                  {doc.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{category?.icon || '👨‍⚕️'}</span>
                  <p className="text-blue-600 font-semibold">{doc.speciality}</p>
                </div>
              </div>
              
              {/* Availability Badge */}
              <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-md flex items-center gap-2 ${
                doc.available 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                <span className={`w-2 h-2 rounded-full ${doc.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {doc.available ? 'Available' : 'Busy'}
              </span>
            </div>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-purple-500 text-lg">🎓</span>
                <span className="text-gray-700 font-medium">Exp: {doc.experience || 'N/A'} yrs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-lg">💰</span>
                <span className="text-gray-700 font-medium">Fee: {doc.fee ? `${currencySymbol}${doc.fee}` : 'Free'}</span>
              </div>
              {doc.rating && (
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="text-gray-700 font-medium">{doc.rating}</span>
                </div>
              )}
            </div>
            
            {/* Additional Info */}
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              {doc.location && (
                <div className="flex items-center gap-1">
                  <span className="text-blue-500">📍</span>
                  <span>{doc.location}</span>
                </div>
              )}
              {doc.reviews && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">💬</span>
                  <span>{doc.reviews} reviews</span>
                </div>
              )}
              {doc.degree && (
                <div className="flex items-center gap-1">
                  <span className="text-purple-500">🎓</span>
                  <span>{doc.degree}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Book Button */}
          <div className="text-right ml-6">
            <button className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md text-white font-bold bg-gradient-to-r ${
              categoryColor === 'blue' ? 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' :
              categoryColor === 'pink' ? 'from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800' :
              categoryColor === 'green' ? 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' :
              categoryColor === 'yellow' ? 'from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800' :
              categoryColor === 'purple' ? 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' :
              categoryColor === 'indigo' ? 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800' :
              'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
            }`}>
              <span className="flex items-center gap-2">
                <span>📅</span>
                Book Now
              </span>
            </button>
          </div>
        </div>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-lg border-b border-blue-100 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-20 left-20 w-20 h-20 bg-purple-200/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-green-200/30 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 px-8 py-3 rounded-full border border-blue-200 shadow-sm"
            >
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v8" />
              </svg>
              <span className="text-blue-700 font-bold uppercase tracking-wide text-sm">Healthcare Professionals</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6"
            >
              Find Your Perfect Doctor
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Browse through our extensive network of qualified healthcare professionals and book appointments with ease. 
              From specialists to general practitioners, find the right care for you.
            </motion.p>
            
            {/* Quick Stats Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-white/20"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{doctors.length}</div>
                <div className="text-sm text-gray-600">Total Doctors</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {doctors.filter(doc => doc.available).length}
                </div>
                <div className="text-sm text-gray-600">Available Now</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
                <div className="text-sm text-gray-600">Specialities</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Input */}
            <div className="flex-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Doctors
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, speciality, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="lg:w-48">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-gray-700 bg-white"
              >
                <option value="name">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="experience">Experience (High-Low)</option>
                <option value="experience-desc">Experience (Low-High)</option>
                <option value="fee">Fee (Low-High)</option>
                <option value="fee-desc">Fee (High-Low)</option>
                <option value="rating">Rating (High-Low)</option>
                <option value="rating-desc">Rating (Low-High)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="lg:w-32">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </label>
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1">
                    <span>🔲</span>
                    Grid
                  </span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1">
                    <span>📋</span>
                    List
                  </span>
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
                  <motion.button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg transform group ${
                      (speciality === cat.name || selectedCategory === cat.name)
                        ? getCategoryStyles(cat.color)
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
                        (speciality === cat.name || selectedCategory === cat.name)
                          ? 'bg-white shadow-md scale-110'
                          : 'bg-gray-100 group-hover:bg-gray-200 group-hover:scale-105'
                      }`}>
                        {cat.icon}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-lg">{cat.name}</span>
                        <div className="text-sm text-gray-500 mt-1">
                          {doctors.filter(doc => doc.speciality === cat.name).length} doctors available
                        </div>
                      </div>
                      {(speciality === cat.name || selectedCategory === cat.name) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
                        >
                          <span className="text-blue-600 text-sm">✓</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

                        {/* Enhanced Quick Stats */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-100 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-3 text-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📊</span>
              </div>
              Quick Stats
            </h3>
            
            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{doctors.length}</p>
                    <p className="text-xs text-gray-600 font-medium">Total Doctors</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">👨‍⚕️</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-green-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {doctors.filter(doc => doc.available).length}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">Available Now</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-lg">✅</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Speciality Breakdown */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-purple-500">🏥</span>
                Speciality Breakdown
              </h4>
              <div className="space-y-2">
                {categories.map((cat, index) => {
                  const count = doctors.filter(doc => doc.speciality === cat.name).length;
                  const percentage = doctors.length > 0 ? Math.round((count / doctors.length) * 100) : 0;
                  
                  return count > 0 && (
                    <motion.div 
                      key={cat.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                      className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-800">{count}</span>
                        <span className="text-xs text-gray-500">({percentage}%)</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Current Filter Stats */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-indigo-500">🔍</span>
                Current Results
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Filtered Results:</span>
                <span className="text-lg font-bold text-indigo-600">{filterDoc.length}</span>
              </div>
              {selectedCategory && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Selected Speciality:</span>
                  <span className="text-sm font-semibold text-indigo-700">{selectedCategory}</span>
                </div>
              )}
              {searchTerm && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Search Term:</span>
                  <span className="text-sm font-semibold text-indigo-700">"{searchTerm}"</span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  navigate('/doctors');
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>🔄</span>
                  Reset All Filters
                </span>
              </button>
              
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border border-gray-200"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>{viewMode === 'grid' ? '📋' : '🔲'}</span>
                  {viewMode === 'grid' ? 'List View' : 'Grid View'}
                </span>
              </button>
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
                  className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-6 py-3 rounded-xl transition-all duration-300 text-sm font-medium border border-gray-300 hover:border-gray-400 transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear All Filters
                  </span>
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
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl font-semibold text-lg"
                            >
                              <span className="flex items-center gap-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                View All Doctors
                              </span>
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
