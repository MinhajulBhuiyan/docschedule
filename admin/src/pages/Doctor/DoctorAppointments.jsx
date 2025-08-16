import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { FaUser, FaCalendarAlt, FaMoneyBillWave, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa"

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 mb-12 px-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide flex items-center gap-2">
          <FaCalendarAlt className="text-blue-600" /> Appointments Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-2 sm:mt-0">Manage & track all your scheduled appointments</p>
      </div>

      {/* Container */}
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 py-4 px-6 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white font-semibold tracking-wide">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-3 items-center text-gray-700 py-4 px-6 border-b hover:bg-gray-50 transition-all duration-200"
          >
            <p className="hidden md:block">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-3 w-full">
              <img src={item.userData.image} className="w-10 h-10 rounded-full shadow-md" alt="patient" />
              <div>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                  <FaUser className="text-gray-500" /> {item.userData.name}
                </p>
                <p className="text-xs text-gray-500 italic">Patient ID: {item.userData._id.slice(-6)}</p>
              </div>
            </div>

            {/* Payment */}
            <div>
              <p className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm inline-block
                ${item.payment ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-yellow-100 text-yellow-700 border border-yellow-300'}
              `}>
                {item.payment ? 'Online Payment' : 'Cash Payment'}
              </p>
            </div>

            {/* Age */}
            <p className="hidden md:block">{calculateAge(item.userData.dob)} yrs</p>

            {/* Date & Time */}
            <p className="flex items-center gap-2">
              <FaClock className="text-indigo-500" />
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p className="font-semibold text-gray-800">{currency}{item.amount}</p>

            {/* Actions */}
            {item.cancelled ? (
              <p className="text-red-500 font-medium text-sm flex items-center gap-1">
                <FaTimesCircle /> Cancelled
              </p>
            ) : item.isCompleted ? (
              <p className="text-green-600 font-medium text-sm flex items-center gap-1">
                <FaCheckCircle /> Completed
              </p>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="px-3 py-1 rounded-lg bg-red-100 text-red-600 border border-red-300 hover:bg-red-200 transition-all text-sm shadow-sm flex items-center gap-1"
                >
                  <FaTimesCircle /> Cancel
                </button>
                <button
                  onClick={() => completeAppointment(item._id)}
                  className="px-3 py-1 rounded-lg bg-green-100 text-green-600 border border-green-300 hover:bg-green-200 transition-all text-sm shadow-sm flex items-center gap-1"
                >
                  <FaCheckCircle /> Complete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm text-sm text-gray-600">
        <p><strong>Tip:</strong> Hover over any row to highlight it. Use the action buttons to update appointment status in real-time. Completed & cancelled appointments cannot be modified.</p>
      </div>
    </div>
  )
}

export default DoctorAppointments
