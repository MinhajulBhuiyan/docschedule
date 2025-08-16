import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { assets } from '../../assets/assets_frontend/assets'

const MyAppointments = () => {
  const [appointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      speciality: 'Cardiology',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      image: assets.doc1
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      speciality: 'Neurology',
      date: '2024-01-18',
      time: '2:00 PM',
      status: 'pending',
      image: assets.doc2
    }
  ])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Appointments</h1>
          <p className="text-lg text-gray-600">Manage and track your healthcare appointments</p>
        </motion.div>

        <div className="grid gap-6">
          {appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={appointment.image}
                  alt={appointment.doctor}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{appointment.doctor}</h3>
                  <p className="text-blue-600 font-medium">{appointment.speciality}</p>
                  <div className="flex items-center space-x-6 mt-2 text-gray-600">
                    <span>📅 {new Date(appointment.date).toLocaleDateString()}</span>
                    <span>🕒 {appointment.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyAppointments
