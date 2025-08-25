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
  const [viewMode, setViewMode] = useState('list') // 'grid' or 'list'

  // List of specialities with proper medical icons
  const categories = [
    { 
      name: "General Physician", 
      aliases: ["General Doctor", "General Medicine", "General Practitioner", "General Physical"],
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V11H15C13.9 11 13 10.1 13 9V3H5V21H19V21L15 17L13 19L15 21H5V3L13 3V9H21Z"/></svg>, 
      color: "blue" 
    },
    { 
      name: "Gynecologist", 
      aliases: ["Gynaecologist", "Women's Health"],
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /><circle cx="17" cy="17" r="2" fill="pink"/></svg>, 
      color: "pink" 
    },
    { 
      name: "Dermatologist", 
      aliases: ["Skin Specialist", "Dermatology"],
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/></svg>, 
      color: "green" 
    },
    { 
      name: "Pediatricians", 
      aliases: ["Pediatrician", "Child Specialist", "Kids Doctor"],
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M8,6C6.9,6 6,6.9 6,8C6,9.1 6.9,10 8,10C9.1,10 10,9.1 10,8C10,6.9 9.1,6 8,6M16,6C14.9,6 14,6.9 14,8C14,9.1 14.9,10 16,10C17.1,10 18,9.1 18,8C18,6.9 17.1,6 16,6M12,7C13.66,7 15,8.34 15,10V11H9V10C9,8.34 10.34,7 12,7M8,11H5V19H8V11M16,11V19H19V11H16M9,12H15V19H9V12Z"/></svg>, 
      color: "yellow" 
    },
    { 
      name: "Neurologist", 
      aliases: ["Neurology", "Brain Specialist"],
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M12,7C14.76,7 17,9.24 17,12V15H15V12C15,10.34 13.66,9 12,9C10.34,9 9,10.34 9,12V15H7V12C7,9.24 9.24,7 12,7M9,16H15V18H9V16M10,19H14V21H10V19Z"/></svg>, 
      color: "purple" 
    },
    { 
      name: "Gastroenterologist", 
      aliases: ["Gastroenterology", "Stomach Specialist"],
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M7,9H17V11H7V9M8,12H16V14H8V12M9,15H15V17H9V15Z"/></svg>, 
      color: "indigo" 
    }
  ]

  // Helper function to match specialty with category (including aliases)
  const matchesCategory = (doctorSpecialty, categoryName) => {
    if (!doctorSpecialty) return false
    
    const docSpec = doctorSpecialty.toLowerCase().trim()
    const category = categories.find(cat => cat.name === categoryName)
    
    if (!category) return false
    
    // Check exact match with category name
    if (docSpec === category.name.toLowerCase()) return true
    
    // Check aliases
    if (category.aliases) {
      return category.aliases.some(alias => 
        docSpec === alias.toLowerCase() || 
        docSpec.includes(alias.toLowerCase()) ||
        alias.toLowerCase().includes(docSpec)
      )
    }
    
    return false
  }

  // Apply filters and sorting
  const applyFilters = () => {
    setLoading(true)
    let filtered = [...doctors]

    // Filter by speciality
    if (speciality) {
      filtered = filtered.filter(doc => 
        matchesCategory(doc.speciality, speciality) ||
        doc.speciality === speciality
      )
      setSelectedCategory(speciality)
    } else if (selectedCategory) {
      filtered = filtered.filter(doc => 
        matchesCategory(doc.speciality, selectedCategory) ||
        doc.speciality === selectedCategory
      )
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
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'experience':
          // Extract numeric value from experience (handles "5 Years", "5", etc.)
          const expA = parseInt(String(a.experience || '0').match(/\d+/)?.[0] || '0')
          const expB = parseInt(String(b.experience || '0').match(/\d+/)?.[0] || '0')
          return expB - expA
        case 'experience-desc':
          // Extract numeric value from experience (handles "5 Years", "5", etc.)
          const expDescA = parseInt(String(a.experience || '0').match(/\d+/)?.[0] || '0')
          const expDescB = parseInt(String(b.experience || '0').match(/\d+/)?.[0] || '0')
          return expDescA - expDescB
        case 'fee':
          return (a.fees || a.fee || 0) - (b.fees || b.fee || 0)
        case 'fee-desc':
          return (b.fees || b.fee || 0) - (a.fees || a.fee || 0)
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

  // Define color themes for each specialty (matching TopDoctors.jsx)
  const specialtyColors = {
    'General Physician': { bg: 'bg-blue-50', text: 'text-blue-600', hoverText: 'text-blue-700', border: 'border-blue-100', hoverBorder: 'border-blue-200' },
    'Gynecologist': { bg: 'bg-pink-50', text: 'text-pink-600', hoverText: 'text-pink-700', border: 'border-pink-100', hoverBorder: 'border-pink-200' },
    'Dermatologist': { bg: 'bg-green-50', text: 'text-green-600', hoverText: 'text-green-700', border: 'border-green-100', hoverBorder: 'border-green-200' },
    'Pediatricians': { bg: 'bg-yellow-50', text: 'text-yellow-600', hoverText: 'text-yellow-700', border: 'border-yellow-100', hoverBorder: 'border-yellow-200' },
    'Neurologist': { bg: 'bg-purple-50', text: 'text-purple-600', hoverText: 'text-purple-700', border: 'border-purple-100', hoverBorder: 'border-purple-200' },
    'Gastroenterologist': { bg: 'bg-indigo-50', text: 'text-indigo-600', hoverText: 'text-indigo-700', border: 'border-indigo-100', hoverBorder: 'border-indigo-200' }
  }

  const DoctorCard = ({ doc, index }) => {
    const colorTheme = specialtyColors[doc.speciality] || specialtyColors['General Physician']
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
        key={index}
        className='group'
      >
        <div 
          onClick={() => { navigate(`/appointment/${doc._id}`); scrollTo(0, 0) }} 
          className={`bg-white border ${colorTheme.border} shadow-sm overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 hover:${colorTheme.hoverBorder} h-full flex flex-col relative before:absolute before:inset-0 before:bg-gradient-to-t before:from-blue-50/0 before:to-blue-50/20 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100`}
        >
          {/* Enhanced Image Container */}
          <div className='relative overflow-hidden aspect-square'>
            <img 
              className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110' 
              src={doc.image} 
              alt={doc.name} 
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500'></div>
            
            {/* Enhanced Status Badge */}
            <div className='absolute top-3 right-3'>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-1 px-2 py-1 text-xs font-medium shadow-lg backdrop-blur-sm rounded-full ${
                  doc.available 
                    ? 'bg-green-500/90 text-white' 
                    : 'bg-gray-800/90 text-white'
                }`}
              >
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-1.5 h-1.5 rounded-full ${doc.available ? 'bg-green-200' : 'bg-gray-400'}`}
                ></motion.div>
                {doc.available ? 'Available' : 'Busy'}
              </motion.div>
            </div>

            {/* Overlay gradient on hover */}
            <div className='absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          </div>

          {/* Enhanced Content Container */}
          <div className='p-6 flex-1 flex flex-col justify-between relative z-10'>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1'>
                {doc.name}
              </h3>
              <p className={`${colorTheme.text} text-sm font-bold mb-3 line-clamp-1 group-hover:${colorTheme.hoverText} transition-colors duration-300 ${colorTheme.bg} px-3 py-1 rounded-full text-center border ${colorTheme.border}`}>
                {doc.speciality}
              </p>
              
              {/* Doctor Information */}
              <div className='space-y-2 mb-4'>
                {doc.experience && (
                  <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className='font-medium'>
                      {typeof doc.experience === 'string' ? doc.experience : 
                       typeof doc.experience === 'object' && doc.experience.line1 ? doc.experience.line1 :
                       `${doc.experience} Years`} Experience
                    </span>
                  </div>
                )}
                
                {(doc.fees || doc.fee) && (
                  <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className='font-medium'>{currencySymbol}{doc.fees || doc.fee}</span>
                  </div>
                )}
                
                {doc.degree && (
                  <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    <span className='font-medium line-clamp-1'>
                      {typeof doc.degree === 'string' ? doc.degree : 
                       typeof doc.degree === 'object' && doc.degree.line1 ? doc.degree.line1 :
                       'Medical Degree'}
                    </span>
                  </div>
                )}
                
                {doc.address && (
                  <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className='font-medium line-clamp-1'>
                      {typeof doc.address === 'string' ? doc.address : 
                       typeof doc.address === 'object' && doc.address.line1 ? 
                       `${doc.address.line1}${doc.address.line2 ? `, ${doc.address.line2}` : ''}` :
                       'Location Available'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced Book Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full bg-gray-900 text-white py-3 px-4 text-sm font-semibold hover:bg-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:shadow-lg relative overflow-hidden rounded-full'
            >
              <span className='relative z-10'>Book Appointment</span>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'></div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  const DoctorListCard = ({ doc, index }) => {
    const colorTheme = specialtyColors[doc.speciality] || specialtyColors['General Physician']
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
        key={index}
        className='group'
      >
        <div 
          onClick={() => { navigate(`/appointment/${doc._id}`); scrollTo(0, 0) }} 
          className={`bg-white border ${colorTheme.border} shadow-sm overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-700 hover:-translate-y-1 hover:${colorTheme.hoverBorder} h-full flex flex-row relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-50/0 before:to-blue-50/20 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100`}
        >
          <div className='flex items-center p-6 w-full'>
            {/* Enhanced Image Container */}
            <div className='relative overflow-hidden aspect-square w-24 h-24 mr-6'>
              <img 
                className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110' 
                src={doc.image} 
                alt={doc.name} 
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500'></div>
              
              {/* Status Badge */}
              <div className='absolute -bottom-1 -right-1'>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-1 px-2 py-1 text-xs font-medium shadow-lg backdrop-blur-sm rounded-full ${
                    doc.available 
                      ? 'bg-green-500/90 text-white' 
                      : 'bg-gray-800/90 text-white'
                  }`}
                >
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-1.5 h-1.5 rounded-full ${doc.available ? 'bg-green-200' : 'bg-gray-400'}`}
                  ></motion.div>
                  {doc.available ? 'Available' : 'Busy'}
                </motion.div>
              </div>
            </div>

            {/* Enhanced Content Container */}
            <div className='flex-1 relative z-10'>
              <div className='flex items-start justify-between mb-3'>
                <div className='flex-1'>
                  <h3 className='text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1'>
                    {doc.name}
                  </h3>
                  <p className={`${colorTheme.text} text-sm font-bold mb-3 line-clamp-1 group-hover:${colorTheme.hoverText} transition-colors duration-300 ${colorTheme.bg} px-3 py-1 rounded-full text-center border ${colorTheme.border} inline-block`}>
                    {doc.speciality}
                  </p>
                  
                  {/* Doctor Information - Horizontal Layout for List View */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm'>
                    {doc.experience && (
                      <div className='flex items-center gap-2 text-gray-600 min-w-0'>
                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className='font-medium truncate'>
                          {typeof doc.experience === 'string' ? doc.experience : 
                           typeof doc.experience === 'object' && doc.experience.line1 ? doc.experience.line1 :
                           `${doc.experience} Years`} Exp.
                        </span>
                      </div>
                    )}
                    
                    {(doc.fees || doc.fee) && (
                      <div className='flex items-center gap-2 text-gray-600 min-w-0'>
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className='font-medium'>{currencySymbol}{doc.fees || doc.fee}</span>
                      </div>
                    )}
                    
                    {doc.degree && (
                      <div className='flex items-center gap-2 text-gray-600 min-w-0'>
                        <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        <span className='font-medium truncate'>
                          {typeof doc.degree === 'string' ? doc.degree : 
                           typeof doc.degree === 'object' && doc.degree.line1 ? doc.degree.line1 :
                           'Medical Degree'}
                        </span>
                      </div>
                    )}
                    
                    {doc.address && (
                      <div className='flex items-center gap-2 text-gray-600 min-w-0'>
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className='font-medium truncate'>
                          {typeof doc.address === 'string' ? doc.address : 
                           typeof doc.address === 'object' && doc.address.line1 ? 
                           `${doc.address.line1}${doc.address.line2 ? `, ${doc.address.line2}` : ''}` :
                           'Location Available'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Book Button */}
            <div className='text-right ml-6 relative z-10'>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='bg-gray-900 text-white py-3 px-6 text-sm font-semibold hover:bg-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:shadow-lg relative overflow-hidden rounded-full'
              >
                <span className='relative z-10'>Book Now</span>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'></div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Find Your Perfect <span className="text-blue-200">Doctor</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Connect with qualified healthcare professionals instantly.
            </motion.p>
            
            
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-2 py-8 pr-8">
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
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="w-auto">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </label>
              <div className="flex bg-gray-200 rounded-full p-1 min-w-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" stroke="none" viewBox="0 0 24 24">
                    <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                  </svg>
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" stroke="none" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
                  </svg>
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 min-h-0">
          {/* Left Sidebar - Categories - Compact */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Specialities</h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-300 hover:shadow-md transform group ${
                      (speciality === cat.name || selectedCategory === cat.name)
                        ? getCategoryStyles(cat.color)
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all duration-300 ${
                        (speciality === cat.name || selectedCategory === cat.name)
                          ? 'bg-white shadow-sm scale-105'
                          : 'bg-gray-100 group-hover:bg-gray-200 group-hover:scale-105'
                      }`}>
                        <span className="text-sm">{cat.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm block truncate">{cat.name}</span>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {doctors.filter(doc => matchesCategory(doc.speciality, cat.name) || doc.speciality === cat.name).length} doctors
                        </div>
                      </div>
                      {(speciality === cat.name || selectedCategory === cat.name) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm"
                        >
                          <svg className="w-2 h-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle - Doctor Cards/List */}
          <div className="flex-1 min-w-0">
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
                        Search: "{searchTerm}"
                        <svg className="w-3 h-3 ml-1 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={() => setSearchTerm('')}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {selectedCategory}
                        <svg className="w-3 h-3 ml-1 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={() => setSelectedCategory('')}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
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
                      <div className="text-purple-500 text-6xl mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
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
                          <div className="text-indigo-500 text-6xl mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
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
