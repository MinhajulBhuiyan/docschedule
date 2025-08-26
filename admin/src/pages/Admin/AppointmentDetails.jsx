import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUserCheck, FaInfoCircle, FaDollarSign, FaLayerGroup } from "react-icons/fa";

const AppointmentDetails = () => {

  // -------------------- Hooks --------------------
  const navigate = useNavigate();
  const location = useLocation();

  // Get appointment passed from previous page
  const { appointment: stateAppointment } = location.state || {};
  const [appointment, setAppointment] = useState(null);

  // Set local state
  useEffect(() => {
    if (stateAppointment) {
      setAppointment(stateAppointment);
    }
  }, [stateAppointment]);

  // -------------------- Fallback UI --------------------
  if (!appointment) {
    return (
      <div className="p-10 text-center min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          ⚠ Appointment not found
        </p>
        <button
          className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition duration-300 font-bold"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  // -------------------- Main UI --------------------
  return (
    <div className="p-12 max-w-6xl mx-auto space-y-12">

      {/* ==================== Page Heading ==================== */}
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          📋 Appointment Details
        </h1>
        <p className="text-gray-600 text-lg">
          Detailed information about this appointment including patient, doctor, and appointment specifics.
        </p>
        <div className="w-32 h-1 bg-blue-600 rounded-full mx-auto mt-4"></div>
      </header>

      {/* ==================== Patient Section ==================== */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-3xl shadow-xl p-12 space-y-6 hover:shadow-2xl transition duration-300">

        <h2 className="text-3xl font-bold flex items-center gap-4 text-blue-700">
          <FaUser className="w-8 h-8" /> Patient Information
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-12">

          <img
            src={appointment.patientImage}
            alt={appointment.patientName}
            className="w-36 h-36 rounded-full object-cover shadow-2xl border-4 border-blue-300"
          />

          <div className="space-y-3 text-gray-700 text-lg">

            <p className="text-2xl font-semibold text-gray-900">
              {appointment.patientName}
            </p>

            <div className="flex items-center gap-4 text-gray-600 text-lg">
              <FaPhone className="w-5 h-5" /> {appointment.patientPhone}
            </div>

            <div className="flex items-start gap-4 text-gray-600 text-lg">
              <FaMapMarkerAlt className="w-5 h-5 mt-0.5" />
              {typeof appointment.patientAddress === "object"
                ? `${appointment.patientAddress.line1}, ${appointment.patientAddress.line2}`
                : appointment.patientAddress}
            </div>

            <p className="text-gray-700 text-lg">
              <span className="font-medium">Age:</span> {appointment.patientAge} years
            </p>

          </div>
        </div>

        <div className="flex gap-6 mt-6 flex-wrap">
          <div className="flex items-center gap-2 bg-blue-200 text-blue-800 px-4 py-2 rounded-full font-semibold shadow">
            <FaInfoCircle className="w-5 h-5" /> Patient Info
          </div>
          <div className="flex items-center gap-2 bg-blue-200 text-blue-800 px-4 py-2 rounded-full font-semibold shadow">
            <FaLayerGroup className="w-5 h-5" /> Contact Verified
          </div>
        </div>

      </section>

      {/* ==================== Doctor Section ==================== */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-3xl shadow-xl p-12 space-y-6 hover:shadow-2xl transition duration-300">

        <h2 className="text-3xl font-bold flex items-center gap-4 text-green-700">
          <FaUserCheck className="w-8 h-8" /> Doctor Information
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-12">

          <img
            src={appointment.doctorImage}
            alt={appointment.doctorName}
            className="w-36 h-36 rounded-full object-cover shadow-2xl border-4 border-green-300"
          />

          <div className="space-y-3 text-gray-700 text-lg">

            <p className="text-2xl font-semibold text-gray-900">
              {appointment.doctorName}
            </p>

            <p className="text-gray-700 text-lg">
              <span className="font-medium">Speciality:</span> {appointment.doctorSpeciality}
            </p>

            <p className="text-gray-500 text-lg">
              Assigned Doctor
            </p>

          </div>
        </div>

      </section>

      {/* ==================== Appointment Info Section ==================== */}
      <section className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 rounded-3xl shadow-xl p-12 space-y-6 hover:shadow-2xl transition duration-300">

        <h2 className="text-3xl font-bold flex items-center gap-4 text-yellow-700">
          <FaCalendarAlt className="w-8 h-8" /> Appointment Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-800 text-lg">

          <div className="flex items-center gap-3 text-lg">
            <FaCalendarAlt className="w-6 h-6 text-gray-500" /> Date: {appointment.date}
          </div>

          <div className="flex items-center gap-3 text-lg">
            <FaClock className="w-6 h-6 text-gray-500" /> Time: {appointment.time}
          </div>

          <div className="flex items-center gap-3 text-lg">
            <FaDollarSign className="w-6 h-6 text-gray-500" /> Fees: ${appointment.fees}
          </div>

          <div className="flex items-center gap-3 text-lg">
            <span className="font-medium">Status:</span>
            <span
              className={`px-6 py-2 rounded-full text-white font-bold text-lg ${
                appointment.status === "Pending"
                  ? "bg-yellow-500"
                  : appointment.status === "Completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {appointment.status}
            </span>
          </div>

        </div>

      </section>

      {/* ==================== Back Button ==================== */}
      <div className="text-center mt-12">
        <button
          className="px-12 py-4 rounded-3xl bg-gray-200 text-gray-800 hover:bg-gray-300 font-bold text-xl shadow-lg transition duration-300"
          onClick={() => navigate(-1)}
        >
          ← Back to Appointments
        </button>
      </div>

    </div>
  );
};

export default AppointmentDetails;
