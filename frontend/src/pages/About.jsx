import React from 'react'
import { assets } from "../assets/assets_frontend/assets";
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    {
      icon: "⚡",
      title: "EFFICIENCY",
      description: "Streamlined appointment scheduling that fits into your busy lifestyle.",
      color: "blue"
    },
    {
      icon: "🎯",
      title: "CONVENIENCE",
      description: "Access to a network of trusted healthcare professionals in your area.",
      color: "green"
    },
    {
      icon: "✨",
      title: "PERSONALIZATION",
      description: "Tailored recommendations and reminders to help you stay on top of your health.",
      color: "purple"
    },
    {
      icon: "🛡️",
      title: "SECURITY",
      description: "Your health data is protected with industry-leading security measures.",
      color: "red"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Patients" },
    { number: "500+", label: "Expert Doctors" },
    { number: "50+", label: "Specialties" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-blue-200">Prescripto</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in managing healthcare needs conveniently and efficiently
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Revolutionizing Healthcare Access
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                At Prescripto, we understand the challenges individuals face when it comes to 
                scheduling doctor appointments and managing their health records. We're committed 
                to making healthcare accessible, convenient, and personalized for everyone.
              </p>
              <p className="text-lg">
                Our platform bridges the gap between patients and healthcare providers, 
                ensuring you get the care you need when you need it, without the hassle 
                of traditional appointment booking systems.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              className="w-full rounded-2xl shadow-2xl" 
              src={assets.about_image} 
              alt="Healthcare professionals" 
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
              <div className="text-3xl font-bold text-blue-600 mb-2">5+ Years</div>
              <div className="text-gray-600">Serving patients with excellence</div>
            </div>
          </motion.div>
        </div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-12 mb-20 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Vision</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            To create a seamless healthcare experience for every user, making quality healthcare 
            accessible to everyone, everywhere. We envision a world where managing your health 
            is as simple as a few clicks, and where every patient feels empowered and supported 
            in their healthcare journey.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-800 mb-16"
          >
            Why Choose <span className="text-blue-600">Prescripto</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Commitment</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We continuously strive to enhance our platform, integrating the latest advancements 
              to improve user experience and deliver superior service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-blue-50">
              <div className="text-3xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600">Cutting-edge technology for better healthcare</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-green-50">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Trust</h3>
              <p className="text-gray-600">Building lasting relationships with patients</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-purple-50">
              <div className="text-3xl mb-4">💪</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Excellence</h3>
              <p className="text-gray-600">Unwavering commitment to quality service</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
