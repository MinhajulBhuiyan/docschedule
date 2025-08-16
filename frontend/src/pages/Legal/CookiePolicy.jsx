import React from 'react'
import { motion } from 'framer-motion'

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">How we use cookies to improve your experience</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <h2>1. What Are Cookies</h2>
            <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience.</p>
            
            <h2>2. How We Use Cookies</h2>
            <p>We use cookies to remember your preferences, analyze how you use our site, and provide personalized content and advertisements.</p>
            
            <h2>3. Types of Cookies</h2>
            <p>We use essential cookies for basic functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings.</p>
            
            <h2>4. Managing Cookies</h2>
            <p>You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.</p>
            
            <h2>5. Third-Party Cookies</h2>
            <p>Some cookies may be placed by third-party services that appear on our pages, such as analytics providers or advertising networks.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookiePolicy
