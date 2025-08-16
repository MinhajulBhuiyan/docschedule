import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { FaUserMd, FaStethoscope, FaCheckCircle, FaTimesCircle, FaHospital } from "react-icons/fa"

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  // Group doctors by speciality
  const groupedBySpeciality = doctors.reduce((acc, doctor) => {
    if (!acc[doctor.speciality]) {
      acc[doctor.speciality] = []
    }
    acc[doctor.speciality].push(doctor)
    return acc
  }, {})

  return (
    <div className="m-6 max-h-[90vh] overflow-y-scroll">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide flex items-center gap-2">
          <FaHospital className="text-indigo-600" /> Doctors Directory
        </h1>
        <p className="text-gray-500 text-sm mt-2 sm:mt-0">
          Browse doctors by speciality, update availability, and view their profiles.
        </p>
      </div>

      {/* Speciality Sections */}
      {Object.keys(groupedBySpeciality).map((speciality, idx) => (
        <div key={idx} className="mb-10">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-5">
            <FaStethoscope className="text-indigo-500 text-xl" />
            <h2 className="text-2xl font-semibold text-gray-800">{speciality}</h2>
            <span className="text-sm text-gray-500">
              ({groupedBySpeciality[speciality].length} doctors)
            </span>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupedBySpeciality[speciality].map((item, index) => (
              <div
                key={index}
                className="group border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-indigo-50 to-white cursor-pointer overflow-hidden relative"
              >
                {/* Doctor Image */}
                <div className="relative w-full h-56 bg-indigo-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {speciality}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUserMd className="text-indigo-500" /> {item.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 italic">{item.degree}</p>

                  {/* Availability Toggle */}
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      onChange={() => changeAvailability(item._id)}
                      type="checkbox"
                      checked={item.available}
                      className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                    />
                    <p className={`text-sm font-medium ${item.available ? "text-green-600" : "text-red-500"}`}>
                      {item.available ? (
                        <span className="flex items-center gap-1"><FaCheckCircle /> Available</span>
                      ) : (
                        <span className="flex items-center gap-1"><FaTimesCircle /> Not Available</span>
                      )}
                    </p>
                  </div>

                  {/* Extra Info */}
                  <div className="mt-4 text-xs text-gray-500 bg-gray-50 border border-gray-200 p-3 rounded-lg leading-relaxed">
                    <p><strong>Doctor ID:</strong> {item._id}</p>
                    <p><strong>Speciality:</strong> {item.speciality}</p>
                    <p><strong>Status:</strong> {item.available ? "Accepting patients" : "Currently unavailable"}</p>
                  </div>

                  {/* Hover CTA */}
                  <div className="mt-4">
                    <button className="w-full py-2 px-4 text-center text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-indigo-800 transition-all">
                      View Full Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footer Info */}
      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm text-sm text-gray-600">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Usage Notes:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Doctors are grouped by their <strong>speciality</strong> for easier browsing.</li>
          <li>Hover over doctor photos for a <strong>smooth zoom-in effect</strong>.</li>
          <li>Toggle availability with a single click — updates in real time.</li>
          <li>Doctor cards contain profile image, name, degree, speciality, and availability status.</li>
          <li>Each cards also includes a <strong>“View Full Profile”</strong> button for quick navigation.</li>
        </ul>
      </div>
    </div>
  )
}

export default DoctorsList
