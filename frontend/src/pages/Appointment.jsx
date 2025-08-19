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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Hero Section with Doctor Details */}
            <div className="relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-transparent rounded-full blur-3xl"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        
                        {/* Doctor Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50 backdrop-blur-sm">
                                {/* Profile Image */}
                                <div className="flex justify-center mb-8">
                                    <div className="relative">
                                        <div className="w-48 h-48 rounded-full p-2 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 shadow-2xl">
                                            <img
                                                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                                                src={docInfo.image}
                                                alt={docInfo.name}
                                            />
                                        </div>
                                        {/* Online Status Indicator */}
                                        <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>
                                    </div>
                                </div>

                                {/* Doctor Info */}
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-3">
                                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                            {docInfo.name}
                                        </h1>
                                        <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
                                    </div>
                                    
                                    <p className="text-lg text-gray-600 mb-2">
                                        {docInfo.degree}
                                    </p>
                                    <p className="text-xl font-semibold text-indigo-600 mb-3">
                                        {docInfo.speciality}
                                    </p>
                                    
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg">
                                        <span className="text-sm font-medium">Experience:</span>
                                        <span className="font-bold">{docInfo.experience}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Doctor Details & About */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50 backdrop-blur-sm">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                        About Doctor
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {docInfo.about}
                                    </p>
                                </div>

                                {/* Appointment Fee Card */}
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 font-medium text-lg">Appointment Fee</p>
                                            <p className="text-sm text-gray-500">Consultation & Treatment</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                {currencySymbol}{docInfo.fees}
                                            </p>
                                            <p className="text-sm text-gray-500">per session</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50 backdrop-blur-sm">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">Book Your Appointment</h2>
                        <p className="text-gray-600 text-lg">Choose your preferred date and time slot</p>
                    </div>

                    {/* Date Selection */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Date</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {docSlots.length && docSlots.map((item, index) => {
                                const isSelected = slotIndex === index;
                                const date = item[0]?.datetime;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => { setSlotIndex(index); setSlotTime(''); }}
                                        className={`flex flex-col items-center justify-center px-6 py-4 min-w-[90px] rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                            isSelected 
                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30" 
                                                : "bg-gray-50 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                                        }`}
                                    >
                                        <span className="text-sm font-medium opacity-80">{date && daysOfWeek[date.getDay()]}</span>
                                        <span className="text-2xl font-bold">{date && date.getDate()}</span>
                                        <span className="text-xs opacity-70">{date && date.toLocaleDateString('en-US', { month: 'short' })}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Time Slot Selection */}
                    {docSlots[slotIndex] && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Time</h3>
                            <div className="relative w-full max-w-md">
                                <select
                                    value={slotTime}
                                    onChange={(e) => setSlotTime(e.target.value)}
                                    className="block w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 text-lg text-gray-700 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 cursor-pointer transition-all duration-300 hover:border-blue-300 appearance-none"
                                >
                                    <option value="" disabled>
                                        Choose a time slot
                                    </option>
                                    {docSlots[slotIndex].map((slot, idx) => (
                                        <option key={idx} value={slot.time}>
                                            {slot.time}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Book Button */}
                    <div className="text-center">
                        <button
                            onClick={bookAppointment}
                            disabled={!slotTime}
                            className={`px-12 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                                slotTime 
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40" 
                                    : "bg-gray-300 cursor-not-allowed"
                            }`}
                        >
                            {slotTime ? 'Book Appointment Now' : 'Select Time to Book'}
                        </button>
                        
                        {slotTime && (
                            <p className="text-sm text-gray-500 mt-3">
                                You're booking for {slotTime} on {docSlots[slotIndex] && docSlots[slotIndex][0]?.datetime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Doctors Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading doctor information...</p>
            </div>
        </div>
    )
}

export default Appointment