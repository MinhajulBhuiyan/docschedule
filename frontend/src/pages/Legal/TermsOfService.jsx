import React from 'react'
import { motion } from 'framer-motion'

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Please read these terms carefully before using our service</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using DocSchedule, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on DocSchedule's website for personal, non-commercial transitory viewing only.</p>
            
            <h2>3. Disclaimer</h2>
            <p>The materials on DocSchedule's website are provided on an 'as is' basis. DocSchedule makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h2>4. Limitations</h2>
            <p>In no event shall DocSchedule or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DocSchedule's website.</p>
            
            <h2>5. Revisions and Errata</h2>
            <p>The materials appearing on DocSchedule's website could include technical, typographical, or photographic errors. DocSchedule does not warrant that any of the materials on its website are accurate, complete or current.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
