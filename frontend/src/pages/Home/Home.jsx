import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { assets, doctors } from '../../assets/assets_frontend/assets'

// Enhanced Home Page Component with Advanced Features
// Last Updated: December 2024
const Home = () => {
  // State management for various home page features
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    satisfaction: 0
  })

  // Scroll animations
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const headerScale = useTransform(scrollY, [0, 300], [1, 0.8])

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Patient",
      image: assets.profile_pic,
      text: "DocSchedule made booking my appointment so easy! I found a great doctor in my area and got an appointment within 24 hours. The platform is incredibly user-friendly.",
      rating: 5,
      speciality: "Cardiology"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      image: assets.doc1,
      text: "As a healthcare provider, DocSchedule has streamlined my practice management. The appointment scheduling system is efficient and my patients love the convenience.",
      rating: 5,
      speciality: "Cardiology"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Patient",
      image: assets.profile_pic,
      text: "I was able to compare different doctors and read reviews before making my decision. The transparency and ease of use is exactly what healthcare needs.",
      rating: 5,
      speciality: "Dermatology"
    }
  ]

  // Features data
  const features = [
    {
      id: 1,
      icon: "🔍",
      title: "Smart Doctor Search",
      description: "Find the perfect doctor based on speciality, location, availability, and patient reviews. Our AI-powered search ensures you get the best match.",
      benefits: ["Advanced filtering", "Real-time availability", "Patient reviews", "Location-based results"]
    },
    {
      id: 2,
      icon: "📅",
      title: "Instant Booking",
      description: "Book appointments in seconds with our streamlined booking system. No more phone calls or waiting on hold - everything is done online.",
      benefits: ["24/7 availability", "Instant confirmation", "Reminder notifications", "Easy rescheduling"]
    },
    {
      id: 3,
      icon: "💬",
      title: "Virtual Consultations",
      description: "Connect with healthcare professionals from the comfort of your home. High-quality video consultations with secure, HIPAA-compliant technology.",
      benefits: ["Secure video calls", "File sharing", "Prescription management", "Follow-up scheduling"]
    },
    {
      id: 4,
      icon: "📱",
      title: "Mobile App",
      description: "Access your health information and manage appointments on the go with our feature-rich mobile application.",
      benefits: ["Cross-platform", "Offline access", "Push notifications", "Biometric security"]
    }
  ]

  // Statistics data
  const targetStats = {
    doctors: 5000,
    patients: 100000,
    appointments: 50000,
    satisfaction: 98
  }

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Animate statistics on scroll
  useEffect(() => {
    const animateStats = () => {
      const scrollPosition = window.scrollY
      const statsSection = document.getElementById('stats-section')
      
      if (statsSection && scrollPosition > statsSection.offsetTop - window.innerHeight * 0.8) {
        const duration = 2000
        const startTime = Date.now()
        
        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          setStats({
            doctors: Math.floor(targetStats.doctors * progress),
            patients: Math.floor(targetStats.patients * progress),
            appointments: Math.floor(targetStats.appointments * progress),
            satisfaction: Math.floor(targetStats.satisfaction * progress)
          })
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        
        animate()
      }
    }

    window.addEventListener('scroll', animateStats)
    return () => window.removeEventListener('scroll', animateStats)
  }, [])

  // Handle video play
  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }

  // Close video modal
  const closeVideoModal = () => {
    setIsVideoPlaying(false)
  }

  return (
    <div className="min-h-screen">
      
      {/* Hero Section with Enhanced Background */}
      <motion.section 
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500"></div>
          
          {/* Floating Geometric Shapes */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1.1, 1, 1.1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400/30 rounded-full blur-2xl"
          />
          
          {/* Particle Effect */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -1000],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
            >
              <span className="block">Your Health Journey</span>
              <span className="block text-blue-200">Starts Here</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Connect with trusted healthcare professionals, book appointments instantly, 
              and take control of your wellness with our comprehensive platform.
            </motion.p>

            {/* Call-to-Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
                             <Link to="/doctors">
                 <motion.button
                   whileHover={{ scale: 1.05, y: -2 }}
                   whileTap={{ scale: 0.95 }}
                   className="px-8 py-4 bg-white text-blue-800 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3"
                 >
                   <span>Find Doctors Now</span>
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                   </svg>
                 </motion.button>
               </Link>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVideoPlay}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-800 transition-all duration-300 flex items-center space-x-3"
              >
                <span>Watch Demo</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-8 pt-8"
            >
              <div className="flex items-center space-x-2 text-blue-200">
                <span className="text-2xl">✓</span>
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <span className="text-2xl">🔒</span>
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <span className="text-2xl">⭐</span>
                <span className="text-sm">Trusted by Millions</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Statistics Section */}
      <section id="stats-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Healthcare Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform has revolutionized how patients and healthcare providers connect, 
              making healthcare more accessible and efficient for everyone.
            </p>
          </motion.div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Doctors', value: stats.doctors, suffix: '+', icon: '👨‍⚕️' },
              { label: 'Patients', value: stats.patients, suffix: '+', icon: '👥' },
              { label: 'Appointments', value: stats.appointments, suffix: '+', icon: '📅' },
              { label: 'Satisfaction', value: stats.satisfaction, suffix: '%', icon: '⭐' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose DocSchedule?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built a comprehensive platform that addresses every aspect of 
              healthcare appointment management and patient care.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <motion.div
                      key={benefitIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.1) + (benefitIndex * 0.1) }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top Doctors to Book
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simply browse through our extensive list of trusted doctors.
            </p>
          </motion.div>

          {/* Background Floating Blobs */}
          <motion.div 
            animate={{ y: [0, 20, 0], x: [0, 12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 right-20 w-72 h-72 bg-blue-200/15 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, -20, 0], x: [0, -12, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 left-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"
          />

          <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-6 max-w-6xl mx-auto">
            {doctors.slice(0, 10).map((doctor, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={doctor._id}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-500 ease-out shadow-md hover:-translate-y-1 hover:border-blue-200"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    className="w-full h-36 object-cover bg-gradient-to-br from-blue-50 to-blue-100 transition-transform duration-500 group-hover:scale-110" 
                    src={doctor.image} 
                    alt={doctor.name} 
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm"></div>
                    <span className="text-xs font-medium text-green-600">
                      Available
                    </span>
                  </div>
                  <h3 className="text-gray-900 text-base font-bold mb-1 group-hover:text-blue-600 transition-colors duration-300">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium">{doctor.speciality}</p>
                  <p className="text-blue-600 text-sm font-semibold mt-2">${doctor.fees}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/doctors">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-10 py-3 rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                View More Doctors
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what patients and healthcare 
              providers are saying about their experience with DocSchedule.
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center p-8">
                  <div className="mb-8">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-100"
                    />
                    <div className="flex justify-center space-x-1 mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                      ))}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].speciality}
                    </p>
                  </div>
                  
                  <blockquote className="text-xl text-gray-700 italic leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                </div>
              </motion.div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of patients and healthcare providers who are already 
              benefiting from our platform. Start your journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                Get Started Now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
                     </motion.div>
         </div>
       </section>

       {/* Video Demo Modal */}
       {isVideoPlaying && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
           onClick={closeVideoModal}
         >
           <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0.8, opacity: 0 }}
             className="relative max-w-4xl w-full mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl"
             onClick={(e) => e.stopPropagation()}
           >
             {/* Modal Header */}
             <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-purple-600">
               <h3 className="text-2xl font-bold text-white">DocSchedule Demo</h3>
               <button
                 onClick={closeVideoModal}
                 className="text-white hover:text-gray-200 transition-colors duration-300"
               >
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
             </div>

                            {/* Video Content */}
               <div className="p-6">
                 <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden mb-6">
                   {/* Real Video about Healthcare and Doctors */}
                   <iframe
                     className="w-full h-full"
                     src="https://www.youtube.com/embed/sEmnc_CmPR4?rel=0&modestbranding=1"
                     title="Healthcare Innovation: The Future of Doctor-Patient Care"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                 </div>

               {/* Demo Features */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                 <div className="text-center p-4 bg-blue-50 rounded-lg">
                   <div className="text-3xl mb-2">🔍</div>
                   <h5 className="font-semibold text-gray-800">Smart Search</h5>
                   <p className="text-sm text-gray-600">Find doctors instantly</p>
                 </div>
                 <div className="text-center p-4 bg-purple-50 rounded-lg">
                   <div className="text-3xl mb-2">📅</div>
                   <h5 className="font-semibold text-gray-800">Easy Booking</h5>
                   <p className="text-sm text-gray-600">Book appointments in seconds</p>
                 </div>
                 <div className="text-center p-4 bg-green-50 rounded-lg">
                   <div className="text-3xl mb-2">💬</div>
                   <h5 className="font-semibold text-gray-800">Virtual Consult</h5>
                   <p className="text-sm text-gray-600">Connect from anywhere</p>
                 </div>
               </div>

               {/* Call to Action */}
               <div className="text-center">
                 <p className="text-gray-600 mb-4">
                   Ready to experience the future of healthcare booking?
                 </p>
                 <Link to="/doctors">
                   <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                     onClick={closeVideoModal}
                   >
                     Get Started Now
                   </motion.button>
                 </Link>
               </div>
             </div>
           </motion.div>
         </motion.div>
       )}
     </div>
   )
 }

export default Home
