import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets_frontend/assets";

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >

            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Watch DocSchedule in Action
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              See how easy it is to book appointments and manage your healthcare online
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Demo Video</h2>
            <p className="text-gray-600 text-lg">Learn how to use DocSchedule step by step</p>
          </div>

          {/* Video Container */}
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Demo Video Coming Soon</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We're currently preparing an amazing demo video that will show you all the features of DocSchedule. 
                Stay tuned for an interactive walkthrough!
              </p>
              
              {/* Placeholder Video Frame */}
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-12 max-w-2xl mx-auto">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎬</div>
                  <h4 className="text-xl font-semibold mb-2">Video Player</h4>
                  <p className="text-blue-100">Your demo video will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Find Doctors</h3>
            <p className="text-gray-600">Browse through our network of qualified healthcare professionals</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Book Appointments</h3>
            <p className="text-gray-600">Schedule consultations with just a few clicks</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Payments</h3>
            <p className="text-gray-600">Multiple payment options with secure processing</p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Demo;
