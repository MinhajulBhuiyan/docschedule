import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsVerifying(true)
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsVerifying(false)
    
    // Handle verification logic here
    console.log('Verifying code:', verificationCode)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verify Your Account
          </h1>
          <p className="text-gray-600">
            Enter the verification code sent to your email
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300"
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying || !verificationCode}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                isVerifying || !verificationCode
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isVerifying ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the code?{' '}
              <button className="text-blue-600 hover:text-blue-700 font-semibold">
                Resend Code
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Verify
