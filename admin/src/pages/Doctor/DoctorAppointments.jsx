import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { FiCalendar, FiClock, FiUser, FiDollarSign, FiCheckCircle, FiXCircle } from 'react-icons/fi'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FiCalendar className="text-blue-600" size={24} />
          <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        </div>
        <p className="text-gray-600">Manage your patient appointments efficiently</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiCalendar className="text-blue-600" size={16} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-gray-800">{appointments?.length || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <FiCheckCircle className="text-green-600" size={16} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-gray-800">
                {appointments?.filter(apt => apt.isCompleted).length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <FiClock className="text-yellow-600" size={16} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-800">
                {appointments?.filter(apt => !apt.isCompleted && !apt.cancelled).length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <FiXCircle className="text-red-600" size={16} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Cancelled</p>
              <p className="text-xl font-bold text-gray-800">
                {appointments?.filter(apt => apt.cancelled).length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
          <div className="grid grid-cols-[60px_2fr_1.5fr_100px_100px_120px_140px] gap-4 items-center">
            <span className="text-sm font-semibold text-gray-700">#</span>
            <span className="text-sm font-semibold text-gray-700">Patient</span>
            <span className="text-sm font-semibold text-gray-700">Date & Time</span>
            <span className="text-sm font-semibold text-gray-700 text-center">Age</span>
            <span className="text-sm font-semibold text-gray-700 text-center">Fee</span>
            <span className="text-sm font-semibold text-gray-700 text-center">Payment</span>
            <span className="text-sm font-semibold text-gray-700 text-center">Actions</span>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={item._id || index}
                className="px-6 py-5 hover:bg-gray-50 transition-colors"
              >
                <div className="grid grid-cols-[60px_2fr_1.5fr_100px_100px_120px_140px] gap-4 items-center">
                  {/* Index */}
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={item.userData?.image} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-100" 
                        alt="Patient"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUMyNSAxMi4yMzg2IDIyLjc2MTQgMTAgMjAgMTBDMTcuMjM4NiAxMCAxNSAxMi4yMzg2IDE1IDE1QzE1IDE3Ljc2MTQgMTcuMjM4NiAyMCAyMCAyMFoiIGZpbGw9IiM5Q0E4QjYiLz4KPHBhdGggZD0iTTMwIDMwQzMwIDI1LjAyOTQgMjUuNTIyOCAyMSAyMCAyMUMxNC40NzcyIDIxIDEwIDI1LjAyOTQgMTAgMzBIMzBaIiBmaWxsPSIjOUNBOEI2Ii8+Cjwvc3ZnPgo='
                        }}
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        item.isCompleted ? 'bg-green-500' : item.cancelled ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.userData?.name}</p>
                      <p className="text-sm text-gray-500">ID: {item.userData?._id?.slice(-6)}</p>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-gray-400" size={16} />
                    <div>
                      <p className="font-medium text-gray-900">{slotDateFormat(item.slotDate)}</p>
                      <p className="text-sm text-gray-600">{item.slotTime}</p>
                    </div>
                  </div>

                  {/* Age */}
                  <div className="text-center">
                    <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                      {calculateAge(item.userData?.dob)} yrs
                    </span>
                  </div>

                  {/* Fees */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <FiDollarSign className="text-gray-400" size={14} />
                      <span className="font-semibold text-gray-900">{item.amount}</span>
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div className="flex justify-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      item.payment 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-orange-100 text-orange-700 border border-orange-200'
                    }`}>
                      {item.payment ? 'Paid' : 'Cash'}
                    </span>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex justify-center">
                    {item.cancelled ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 border border-red-200">
                        <FiXCircle className="mr-1" size={14} />
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200">
                        <FiCheckCircle className="mr-1" size={14} />
                        Completed
                      </span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <FiCheckCircle className="mr-1" size={14} />
                          Complete
                        </button>
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <FiXCircle className="mr-1" size={14} />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-16 text-center">
              <FiCalendar className="mx-auto mb-4 text-gray-300" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-500">Your appointments will appear here once scheduled.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments
