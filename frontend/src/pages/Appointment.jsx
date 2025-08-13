import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div>

              <div>

           {/* ---------- Doctor Details ----------- */}
<div className="flex flex-col sm:flex-row gap-8 p-3 m-2">
  {/* Profile Image */}
  <div className="flex justify-center sm:block">
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full p-1 bg-gradient-to-tr from-sky-400 to-indigo-600 shadow-lg">
      <img
        className="w-full h-full object-cover rounded-full border-4 border-white"
        src={docInfo.image}
        alt={docInfo.name}
      />
    </div>
  </div>

  {/* Info Card */}
  <div className="flex-1 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
    {/* Name & Verified */}
    <div className="flex items-center gap-3">
      <h1 className="text-3xl font-bold text-gray-800">
        {docInfo.name}
      </h1>
      <img className="w-6" src={assets.verified_icon} alt="Verified" />
    </div>

    {/* Degree, Specialty & Experience */}
    <div className="flex flex-wrap items-center gap-3 mt-2">
      <p className="text-lg text-gray-600">
        {docInfo.degree} - {docInfo.speciality}
      </p>
      <span className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-sm">
        {docInfo.experience}
      </span>
    </div>

    {/* About Section */}
    <div className="mt-6">
      <p className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        About
        <img className="w-4" src={assets.info_icon} alt="Info" />
      </p>
      <p className="text-gray-600 text-sm leading-relaxed mt-2 max-w-2xl">
        {docInfo.about}
      </p>
    </div>

    {/* Fees */}
    <div className="mt-6 p-4 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl border border-gray-100">
      <p className="text-gray-600 font-medium">
        Appointment Fee:{" "}
        <span className="text-lg font-semibold text-indigo-600">
          {currencySymbol}{docInfo.fees}
        </span>
      </p>
    </div>
  </div>
</div>

                
        </div>

{/* Booking Slots */}
<div className="sm:ml-72 sm:pl-4 mt-10 font-medium text-gray-700">
  {/* Title */}
  <p className="text-lg font-semibold text-blue-600 mb-3">Booking Slots</p>

  {/* Date Selection */}
  <div className="flex gap-3 overflow-x-auto pb-2">
    {docSlots.length && docSlots.map((item, index) => {
      const isSelected = slotIndex === index;
      const date = item[0]?.datetime;
      return (
        <div
          key={index}
          onClick={() => { setSlotIndex(index); setSlotTime(''); }}
          className={`flex flex-col items-center justify-center px-4 py-3 min-w-[70px] rounded-lg cursor-pointer transition-colors 
            ${isSelected ? "bg-blue-600 text-white" : "bg-white border border-gray-300 hover:border-blue-400"}`}
        >
          <span className="text-sm font-medium">{date && daysOfWeek[date.getDay()]}</span>
          <span className="text-base font-semibold">{date && date.getDate()}</span>
        </div>
      )
    })}
  </div>

 {/* Time Slots Dropdown for Selected Date */}
{docSlots[slotIndex] && (
  <div className="relative mt-4 w-48">
    <select
      value={slotTime}
      onChange={(e) => setSlotTime(e.target.value)}
      className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer transition"
    >
      <option value="" disabled>
        Select a time
      </option>
      {docSlots[slotIndex].map((slot, idx) => (
        <option key={idx} value={slot.time}>
          {slot.time.toLowerCase()}
        </option>
      ))}
    </select>
  </div>
)}


  {/* Book Button */}
  <div className="mt-6">
    <button
      onClick={bookAppointment}
      disabled={!slotTime}
      className={`w-full sm:w-auto px-8 py-3 rounded-full text-white font-medium transition
        ${slotTime ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"}`}
    >
      Book Appointment
    </button>
  </div>
</div>



            {/* Listing Releated Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null
}

export default Appointment