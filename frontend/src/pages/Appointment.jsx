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
                                            Dr. {docInfo.name}
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

            {/* Comprehensive Package Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Perfect Package</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Select from our comprehensive range of healthcare packages designed to meet your specific needs and budget</p>
                </div>

                {/* Basic Consultation Package */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50 backdrop-blur-sm mb-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-gray-800">Basic Consultation</h3>
                            </div>
                            <p className="text-gray-600 text-lg mb-6">Perfect for routine check-ups and general health concerns. Get professional medical advice from our experienced doctors.</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">15-minute consultation</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Basic health assessment</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Prescription if needed</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Follow-up recommendations</span>
                                </li>
                            </ul>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-green-600">{currencySymbol}{Math.floor(docInfo.fees * 0.7)}</span>
                                <span className="text-lg text-gray-500 line-through">{currencySymbol}{docInfo.fees}</span>
                                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">30% OFF</span>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                            <h4 className="text-lg font-semibold text-green-800 mb-4">Package Highlights</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Duration:</span>
                                    <span className="font-medium text-gray-800">15 minutes</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Type:</span>
                                    <span className="font-medium text-gray-800">Consultation</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Follow-up:</span>
                                    <span className="font-medium text-gray-800">7 days</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Support:</span>
                                    <span className="font-medium text-gray-800">24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comprehensive Care Package */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50 backdrop-blur-sm mb-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                <h4 className="text-lg font-semibold text-blue-800 mb-4">Package Features</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="font-medium text-gray-800">30 minutes</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Type:</span>
                                        <span className="font-medium text-gray-800">Comprehensive</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Follow-up:</span>
                                        <span className="font-medium text-gray-800">14 days</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Support:</span>
                                        <span className="font-medium text-gray-800">Priority</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-gray-800">Comprehensive Care</h3>
                            </div>
                            <p className="text-gray-600 text-lg mb-6">Our most popular package offering thorough health evaluation, detailed treatment plans, and ongoing support for complex health issues.</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">30-minute detailed consultation</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Comprehensive health assessment</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Detailed treatment plan</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Priority follow-up support</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Lab test recommendations</span>
                                </li>
                            </ul>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-blue-600">{currencySymbol}{docInfo.fees}</span>
                                <span className="text-lg text-gray-500">Standard Price</span>
                                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Most Popular</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium Care Package */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50 backdrop-blur-sm mb-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-gray-800">Premium Care</h3>
                            </div>
                            <p className="text-gray-600 text-lg mb-6">Our premium package for patients who want the highest level of care with extended consultation time and comprehensive health management.</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">45-minute extended consultation</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Complete health evaluation</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Personalized treatment plan</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Unlimited follow-up support</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Priority scheduling</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">24/7 direct doctor access</span>
                                </li>
                            </ul>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-purple-600">{currencySymbol}{Math.floor(docInfo.fees * 1.5)}</span>
                                <span className="text-lg text-gray-500 line-through">{currencySymbol}{Math.floor(docInfo.fees * 1.3)}</span>
                                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Premium</span>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                            <h4 className="text-lg font-semibold text-purple-800 mb-4">Premium Benefits</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Duration:</span>
                                    <span className="font-medium text-gray-800">45 minutes</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Type:</span>
                                    <span className="font-medium text-gray-800">Premium</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Follow-up:</span>
                                    <span className="font-medium text-gray-800">Unlimited</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Support:</span>
                                    <span className="font-medium text-gray-800">24/7 Direct</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Priority:</span>
                                    <span className="font-medium text-gray-800">Highest</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Services Section */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50 backdrop-blur-sm mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Additional Services</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Lab Tests */}
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-yellow-800">Lab Tests</h4>
                            </div>
                            <p className="text-gray-600 mb-4">Comprehensive laboratory testing with detailed reports and analysis.</p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-yellow-600">From {currencySymbol}50</span>
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </div>

                        {/* Home Visit */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-green-800">Home Visit</h4>
                            </div>
                            <p className="text-gray-600 mb-4">Professional medical care in the comfort of your own home.</p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-green-600">From {currencySymbol}100</span>
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </div>

                        {/* Emergency Care */}
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-red-800">Emergency Care</h4>
                            </div>
                            <p className="text-gray-600 mb-4">Immediate medical attention for urgent health concerns.</p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-red-600">From {currencySymbol}150</span>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </div>

                        {/* Telemedicine */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-blue-800">Telemedicine</h4>
                            </div>
                            <p className="text-gray-600 mb-4">Virtual consultations from anywhere with video calling.</p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-blue-600">From {currencySymbol}80</span>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </div>

                        {/* Preventive Care */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-purple-800">Preventive Care</h4>
                            </div>
                            <p className="text-gray-600 mb-4">Regular check-ups and health screenings for prevention.</p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-purple-600">From {currencySymbol}120</span>
                                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </div>

                        {/* Specialist Consultation */}
                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-teal-800">Specialist Consultation</h4>
                            </div>
                            <p className="text-gray-600 mb-4">Expert consultation with specialized medical professionals.</p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-teal-600">From {currencySymbol}200</span>
                                <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                                 {/* Health Insurance Section */}
                 <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-3xl shadow-2xl p-8 border border-blue-100/50 backdrop-blur-sm mb-8 relative overflow-hidden">
                     {/* Background Pattern */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl"></div>
                     <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-full blur-3xl"></div>
                     
                     <div className="relative">
                         <div className="text-center mb-12">
                             <div className="inline-flex items-center gap-3 mb-4">
                                 <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                 <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Health Insurance Partners</h3>
                                 <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                             </div>
                             <p className="text-xl text-gray-600 max-w-3xl mx-auto">We accept major health insurance plans to make healthcare more accessible and affordable for all our patients</p>
                         </div>
                         
                         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                             {[
                                 {
                                     name: "Blue Cross",
                                     description: "Blue Cross Blue Shield",
                                     color: "from-blue-500 to-blue-600",
                                     bgColor: "from-blue-50 to-blue-100",
                                     borderColor: "border-blue-200",
                                     icon: (
                                         <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                             <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                         </svg>
                                     )
                                 },
                                 {
                                     name: "Aetna",
                                     description: "Aetna Health Plans",
                                     color: "from-green-500 to-emerald-600",
                                     bgColor: "from-green-50 to-emerald-100",
                                     borderColor: "border-green-200",
                                     icon: (
                                         <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                             <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                         </svg>
                                     )
                                 },
                                 {
                                     name: "Cigna",
                                     description: "Cigna Healthcare",
                                     color: "from-purple-500 to-purple-600",
                                     bgColor: "from-purple-50 to-purple-100",
                                     borderColor: "border-purple-200",
                                     icon: (
                                         <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                             <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                         </svg>
                                     )
                                 },
                                 {
                                     name: "UnitedHealth",
                                     description: "UnitedHealth Group",
                                     color: "from-red-500 to-red-600",
                                     bgColor: "from-red-50 to-red-100",
                                     borderColor: "border-red-200",
                                     icon: (
                                         <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                             <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                         </svg>
                                     )
                                 }
                             ].map((insurance, index) => (
                                 <div key={index} className="group relative">
                                     <div className={`bg-gradient-to-br ${insurance.bgColor} rounded-3xl p-8 border-2 ${insurance.borderColor} hover:border-blue-400 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20`}>
                                         {/* Icon Container */}
                                         <div className={`w-20 h-20 bg-gradient-to-br ${insurance.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                             {insurance.icon}
                                         </div>
                                         
                                         {/* Content */}
                                         <div className="text-center">
                                             <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{insurance.name}</h4>
                                             <p className="text-gray-600 text-sm mb-4">{insurance.description}</p>
                                             
                                             {/* Status Badge */}
                                             <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
                                                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                 <span className="text-sm font-medium text-green-700">Accepted</span>
                                             </div>
                                         </div>
                                     </div>
                                     
                                     {/* Hover Effect Overlay */}
                                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                 </div>
                             ))}
                         </div>
                         
                         {/* Bottom Info */}
                         <div className="mt-12 text-center">
                             <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-blue-100">
                                 <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                 </svg>
                                 <span className="text-sm font-medium text-gray-700">Contact us to verify your specific coverage and benefits</span>
                             </div>
                         </div>
                     </div>
                 </div>

                {/* Patient Testimonials */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50 backdrop-blur-sm mb-8">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">What Our Patients Say</h3>
                        <p className="text-xl text-gray-600">Real experiences from our satisfied patients</p>
                    </div>
                                         <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                         {[
                             {
                                 name: "Sarah Johnson",
                                 rating: 5,
                                 comment: "The doctor provided exceptional care. The consultation was thorough and the treatment plan was exactly what I needed.",
                                 avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                             },
                             {
                                 name: "Michael Chen",
                                 rating: 5,
                                 comment: "Professional, caring, and knowledgeable. I felt heard and understood throughout the entire appointment.",
                                 avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                             }
                         ].map((testimonial, index) => (
                            <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <img 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                                        <div className="flex items-center gap-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{testimonial.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50 backdrop-blur-sm">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
                        <p className="text-xl text-gray-600">Get answers to common questions about our services</p>
                    </div>
                    <div className="space-y-4">
                        {[
                            {
                                question: "What should I bring to my appointment?",
                                answer: "Please bring your ID, insurance card, list of current medications, and any relevant medical records or test results."
                            },
                            {
                                question: "How do I cancel or reschedule my appointment?",
                                answer: "You can cancel or reschedule your appointment up to 24 hours before the scheduled time through our online portal or by calling our office."
                            },
                            {
                                question: "Do you offer virtual consultations?",
                                answer: "Yes, we offer telemedicine appointments for many types of consultations. These can be scheduled through our online booking system."
                            },
                            {
                                question: "What insurance plans do you accept?",
                                answer: "We accept most major insurance plans. Please contact our office to verify your specific coverage and benefits."
                            },
                            {
                                question: "How long does a typical appointment last?",
                                answer: "Appointment duration varies by package: Basic Consultation (15 min), Comprehensive Care (30 min), and Premium Care (45 min)."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">{faq.question}</h4>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
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