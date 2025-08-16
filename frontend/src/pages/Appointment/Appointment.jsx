import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from '../../assets/assets_frontend/assets'

const Appointment = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    symptoms: '',
    insurance: '',
    notes: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      speciality: 'Cardiology',
      rating: 4.9,
      experience: '15+ years',
      image: assets.doc1,
      availableDates: ['2024-01-15', '2024-01-16', '2024-01-17'],
      availableTimes: ['09:00', '10:00', '11:00', '14:00', '15:00']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      speciality: 'Neurology',
      rating: 4.8,
      experience: '12+ years',
      image: assets.doc2,
      availableDates: ['2024-01-15', '2024-01-18', '2024-01-19'],
      availableTimes: ['09:00', '10:00', '13:00', '14:00']
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      speciality: 'Pediatrics',
      rating: 4.9,
      experience: '10+ years',
      image: assets.doc3,
      availableDates: ['2024-01-16', '2024-01-17', '2024-01-20'],
      availableTimes: ['09:00', '10:00', '11:00', '15:00', '16:00']
    }
  ]

  // Get doctor ID from URL params
  const doctorId = searchParams.get('doctor')

  useEffect(() => {
    if (doctorId) {
      const doctor = doctors.find(d => d.id === parseInt(doctorId))
      if (doctor) {
        setSelectedDoctor(doctor)
        setCurrentStep(2)
      }
    }
  }, [doctorId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1 && !selectedDoctor) {
      newErrors.doctor = 'Please select a doctor'
    }

    if (step === 2) {
      if (!selectedDate) newErrors.date = 'Please select a date'
      if (!selectedTime) newErrors.time = 'Please select a time'
    }

    if (step === 3) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required'
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
      if (!formData.reason.trim()) newErrors.reason = 'Reason for visit is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(3)) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Appointment booked:', {
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        ...formData
      })
      
      // Navigate to confirmation
      setCurrentStep(4)
      
    } catch (error) {
      console.error('Booking failed:', error)
      setErrors({ general: 'Failed to book appointment. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getAvailableDates = () => {
    if (!selectedDoctor) return []
    return selectedDoctor.availableDates
  }

  const getAvailableTimes = () => {
    if (!selectedDoctor || !selectedDate) return []
    return selectedDoctor.availableTimes
  }

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Doctor
        </h2>
        <p className="text-lg text-gray-600">
          Select a healthcare provider that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`relative cursor-pointer rounded-2xl border-2 transition-all duration-300 ${
              selectedDoctor?.id === doctor.id
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {doctor.speciality}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    {doctor.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{doctor.experience}</span>
                </div>
              </div>

              {selectedDoctor?.id === doctor.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {errors.doctor && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-center"
        >
          {errors.doctor}
        </motion.p>
      )}
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Select Date & Time
        </h2>
        <p className="text-lg text-gray-600">
          Choose when you'd like to see {selectedDoctor?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Date Selection */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Dates</h3>
          <div className="grid grid-cols-3 gap-3">
            {getAvailableDates().map((date) => {
              const dateObj = new Date(date)
              const isSelected = selectedDate === date
              const isToday = date === new Date().toISOString().split('T')[0]
              
              return (
                <motion.button
                  key={date}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(date)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-sm font-medium">
                    {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-lg font-bold">
                    {dateObj.getDate()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                  {isToday && (
                    <div className="text-xs text-blue-600 font-medium mt-1">Today</div>
                  )}
                </motion.button>
              )
            })}
          </div>
          {errors.date && (
            <p className="mt-2 text-sm text-red-600">{errors.date}</p>
          )}
        </div>

        {/* Time Selection */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Times</h3>
          <div className="grid grid-cols-2 gap-3">
            {getAvailableTimes().map((time) => {
              const isSelected = selectedTime === time
              const timeObj = new Date(`2000-01-01T${time}`)
              
              return (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTime(time)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-lg font-bold">
                    {timeObj.toLocaleTimeString('en-US', { 
                      hour: 'numeric', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </div>
                </motion.button>
              )
            })}
          </div>
          {errors.time && (
            <p className="mt-2 text-sm text-red-600">{errors.time}</p>
          )}
        </div>
      </div>

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Appointment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-blue-600 font-medium">Doctor:</span>
              <p className="text-blue-900">{selectedDoctor?.name}</p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Date:</span>
              <p className="text-blue-900">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Time:</span>
              <p className="text-blue-900">
                {new Date(`2000-01-01T${selectedTime}`).toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Patient Information
        </h2>
        <p className="text-lg text-gray-600">
          Please provide your details to complete the booking
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 ${
                errors.name 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 ${
                errors.phone 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Provider
            </label>
            <input
              type="text"
              id="insurance"
              name="insurance"
              value={formData.insurance}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300"
              placeholder="Enter insurance provider (optional)"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Visit *
          </label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 ${
              errors.reason 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="Brief description of your symptoms or concern"
          />
          {errors.reason && (
            <p className="mt-2 text-sm text-red-600">{errors.reason}</p>
          )}
        </div>

        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
            Symptoms (Optional)
          </label>
          <textarea
            id="symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 resize-none"
            placeholder="Describe any symptoms you're experiencing..."
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 resize-none"
            placeholder="Any other information you'd like to share..."
          />
        </div>

        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Booking Appointment...
            </div>
          ) : (
            'Book Appointment'
          )}
        </button>
      </form>
    </motion.div>
  )

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8"
    >
      <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Appointment Confirmed!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Your appointment has been successfully booked. We've sent a confirmation email with all the details.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Appointment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div>
            <span className="text-blue-600 font-medium">Doctor:</span>
            <p className="font-semibold">{selectedDoctor?.name}</p>
          </div>
          <div>
            <span className="text-blue-600 font-medium">Speciality:</span>
            <p className="font-semibold">{selectedDoctor?.speciality}</p>
          </div>
          <div>
            <span className="text-blue-600 font-medium">Date:</span>
            <p className="font-semibold">
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <span className="text-blue-600 font-medium">Time:</span>
            <p className="font-semibold">
              {new Date(`2000-01-01T${selectedTime}`).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          Please arrive 10 minutes before your scheduled appointment time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/my-appointments')}
            className="px-8 py-3 bg-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300"
          >
            View My Appointments
          </button>
        </div>
      </div>
    </motion.div>
  )

  const steps = [
    { number: 1, title: 'Choose Doctor', icon: '👨‍⚕️' },
    { number: 2, title: 'Select Time', icon: '📅' },
    { number: 3, title: 'Your Details', icon: '📝' },
    { number: 4, title: 'Confirmation', icon: '✅' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-lg font-bold">{step.number}</span>
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">{step.icon}</div>
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                    currentStep > step.number ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-700 hover:scale-105'
                }`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Next Step
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointment
