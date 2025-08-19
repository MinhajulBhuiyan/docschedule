import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from "../assets/assets_frontend/assets";
import { motion, AnimatePresence } from 'framer-motion';

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [filterStatus, setFilterStatus] = useState('all')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }   
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Filter appointments based on status
    const filteredAppointments = appointments.filter(appointment => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'upcoming') return !appointment.cancelled && !appointment.isCompleted;
        if (filterStatus === 'completed') return appointment.isCompleted;
        if (filterStatus === 'cancelled') return appointment.cancelled;
        if (filterStatus === 'pending') return !appointment.cancelled && !appointment.isCompleted && !appointment.payment;
        if (filterStatus === 'paid') return !appointment.cancelled && !appointment.isCompleted && appointment.payment;
        return true;
    });

    // Get status badge
    const getStatusBadge = (appointment) => {
        if (appointment.cancelled) {
            return { text: 'Cancelled', color: 'bg-red-100 text-red-700 border-red-200' };
        }
        if (appointment.isCompleted) {
            return { text: 'Completed', color: 'bg-green-100 text-green-700 border-green-200' };
        }
        if (appointment.payment) {
            return { text: 'Paid', color: 'bg-blue-100 text-blue-700 border-blue-200' };
        }
        return { text: 'Pending Payment', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    };

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            My <span className="text-blue-200">Appointments</span>
                        </h1>
                        <p className="text-xl text-blue-100">
                            Track and manage your healthcare appointments
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
                >
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{appointments.length}</div>
                        <div className="text-sm text-gray-600">Total Appointments</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                            {appointments.filter(a => !a.cancelled && !a.isCompleted).length}
                        </div>
                        <div className="text-sm text-gray-600">Upcoming</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                            {appointments.filter(a => a.payment).length}
                        </div>
                        <div className="text-sm text-gray-600">Paid</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                            {appointments.filter(a => a.isCompleted).length}
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter by Status
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { 
                                key: 'all', 
                                label: 'All', 
                                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            },
                            { 
                                key: 'upcoming', 
                                label: 'Upcoming', 
                                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            },
                            { 
                                key: 'pending', 
                                label: 'Pending Payment', 
                                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            },
                            { 
                                key: 'paid', 
                                label: 'Paid', 
                                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            },
                            { 
                                key: 'completed', 
                                label: 'Completed', 
                                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            },
                            { 
                                key: 'cancelled', 
                                label: 'Cancelled', 
                                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            }
                        ].map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setFilterStatus(filter.key)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                                    filterStatus === filter.key
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {filter.icon}
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Appointments List */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredAppointments.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-16 text-center"
                    >
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M3 7h18M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            {filterStatus === 'all' ? 'No appointments yet' : `No ${filterStatus} appointments`}
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            {filterStatus === 'all' 
                                ? "You haven't booked any appointments yet. Book now and consult a doctor."
                                : `You don't have any ${filterStatus} appointments at the moment.`
                            }
                        </p>
                        {filterStatus === 'all' && (
                            <button
                                onClick={() => navigate('/doctors')}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Browse Doctors
                            </button>
                        )}
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        <AnimatePresence>
                            {filteredAppointments.map((appointment, index) => (
                                <motion.div
                                    key={appointment._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            {/* Doctor Image */}
                                            <div className="flex-shrink-0">
                                                <img 
                                                    className="w-24 h-24 rounded-2xl object-cover shadow-lg" 
                                                    src={appointment.docData.image} 
                                                    alt={appointment.docData.name} 
                                                />
                                            </div>

                                            {/* Appointment Details */}
                                            <div className="flex-1 space-y-4">
                                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                            {appointment.docData.name}
                                                        </h3>
                                                        <p className="text-blue-600 font-medium mb-2">
                                                            {appointment.docData.speciality}
                                                        </p>
                                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                                {appointment.docData.address.line1}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M3 7h18M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7" />
                                                                </svg>
                                                                {slotDateFormat(appointment.slotDate)}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                {appointment.slotTime}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div className="flex-shrink-0">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(appointment).color}`}>
                                                            {getStatusBadge(appointment).text}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                                                    {!appointment.cancelled && !appointment.isCompleted && !appointment.payment && payment !== appointment._id && (
                                                        <button 
                                                            onClick={() => setPayment(appointment._id)}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                            </svg>
                                                            Pay Online
                                                        </button>
                                                    )}

                                                    {!appointment.cancelled && !appointment.isCompleted && !appointment.payment && payment === appointment._id && (
                                                        <>
                                                            <button 
                                                                onClick={() => appointmentStripe(appointment._id)}
                                                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                            >
                                                                <img className="w-5 h-5" src={assets.stripe_logo} alt="Stripe" />
                                                                Pay with Stripe
                                                            </button>
                                                            <button 
                                                                onClick={() => appointmentRazorpay(appointment._id)}
                                                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                            >
                                                                <img className="w-5 h-5" src={assets.razorpay_logo} alt="Razorpay" />
                                                                Pay with Razorpay
                                                            </button>
                                                        </>
                                                    )}

                                                    {!appointment.cancelled && !appointment.isCompleted && (
                                                        <button 
                                                            onClick={() => cancelAppointment(appointment._id)}
                                                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                            Cancel Appointment
                                                        </button>
                                                    )}

                                                    {appointment.payment && !appointment.isCompleted && (
                                                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium border border-green-200 flex items-center gap-2">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            Payment Completed
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyAppointments
