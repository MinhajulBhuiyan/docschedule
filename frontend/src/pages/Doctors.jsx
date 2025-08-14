import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [filterDoc, setFilterDoc] = useState([])

  // Apply filter based on speciality
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  // List of specialities
  const categories = ["General physician","Gynecologist","Dermatologist","Pediatricians","Neurologist","Gastroenterologist"]

  return (
    <div className="flex flex-col lg:flex-row px-6 sm:px-10 py-6 gap-6">
      {/* Left Sidebar - Categories */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Categories</h2>
        <div className="flex flex-col gap-3 sticky top-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => speciality === cat ? navigate('/doctors') : navigate(`/doctors/${cat}`)}
              className={`text-left px-4 py-2 border rounded transition-all hover:bg-blue-50 ${
                speciality === cat ? 'bg-blue-100 text-blue-700 font-semibold' : 'bg-white text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Right - Doctor Cards */}
      <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filterDoc.map((doc) => (
          <div
            key={doc._id}
            onClick={() => { navigate(`/appointment/${doc._id}`); scrollTo(0,0) }}
            className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            {/* Larger image */}
            <img className="w-full h-64 object-contain bg-gray-50" src={doc.image} alt={doc.name} />

            <div className="p-4 flex flex-col gap-2">
              {/* Availability */}
              <div className="flex items-center gap-2 text-sm">
                <span className={`w-3 h-3 rounded-full ${doc.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className={`${doc.available ? 'text-green-600' : 'text-gray-500'}`}>
                  {doc.available ? 'Available' : 'Not Available'}
                </span>
              </div>

              {/* Name & Speciality */}
              <p className="text-lg font-semibold text-gray-800">{doc.name}</p>
              <p className="text-gray-500 text-sm">{doc.speciality}</p>

              {/* Additional Info */}
              <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
                <span>Exp: {doc.experience || 'N/A'} yrs</span>
                <span>Fee: ${doc.fee || 'Free'}</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500">{'⭐'.repeat(doc.rating || 0)}</span>
                <span className="text-gray-400 ml-2 text-xs">({doc.reviews || 0} reviews)</span>
              </div>
            </div>
          </div>
        ))}

        {filterDoc.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-10">No doctors found for this category.</p>
        )}
      </div>
    </div>
  )
}

export default Doctors
