import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, Phone, MapPin, Calendar, Clock, UserCheck } from "lucide-react";

const AppointmentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointment: stateAppointment } = location.state || {};
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (stateAppointment) setAppointment(stateAppointment);
  }, [stateAppointment]);

  if (!appointment) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg font-semibold">Appointment not found.</p>
        <button
          className="mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 text-center">
        📋 Appointment Details
      </h1>

      {/* Patient Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-3xl shadow-xl p-8 space-y-5">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-blue-700">
          <User className="w-6 h-6" /> Patient Information
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-8">
          <img
            src={appointment.patientImage}
            alt={appointment.patientName}
            className="w-28 h-28 rounded-full object-cover shadow-2xl border-4 border-blue-300"
          />
          <div className="space-y-2 text-gray-700 text-lg">
            <p className="font-semibold text-gray-900">{appointment.patientName}</p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" /> {appointment.patientPhone}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />{" "}
              {typeof appointment.patientAddress === "object"
                ? `${appointment.patientAddress.line1}, ${appointment.patientAddress.line2}`
                : appointment.patientAddress}
            </p>
            <p>
              <span className="font-medium">Age:</span> {appointment.patientAge} years
            </p>
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-3xl shadow-xl p-8 space-y-5">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-green-700">
          <UserCheck className="w-6 h-6" /> Doctor Information
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-8">
          <img
            src={appointment.doctorImage}
            alt={appointment.doctorName}
            className="w-28 h-28 rounded-full object-cover shadow-2xl border-4 border-green-300"
          />
          <div className="space-y-2 text-gray-700 text-lg">
            <p className="font-semibold text-gray-900">{appointment.doctorName}</p>
            <p>
              <span className="font-medium">Speciality:</span> {appointment.doctorSpeciality}
            </p>
            <p className="text-sm text-gray-500">Assigned Doctor</p>
          </div>
        </div>
      </section>

      {/* Appointment Info */}
      <section className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 rounded-3xl shadow-xl p-8 space-y-5">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-yellow-700">
          <Calendar className="w-6 h-6" /> Appointment Details
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-10 text-gray-800 text-lg">
          <p className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" /> Date: {appointment.date}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" /> Time: {appointment.time}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`px-4 py-1 rounded-full text-white font-semibold ${
                appointment.status === "Pending"
                  ? "bg-yellow-500"
                  : appointment.status === "Completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {appointment.status}
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Fees:</span> ${appointment.fees}
          </p>
        </div>
      </section>

      <div className="text-center">
        <button
          className="px-8 py-3 rounded-2xl bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold transition duration-200"
          onClick={() => navigate(-1)}
        >
          ← Back to Appointments
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetails;
