import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { FaUser, FaUserMd, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { MdEventBusy } from "react-icons/md";

/**
 * Status Badge Component
 */
const StatusBadge = ({ type }) => {
  const baseClasses =
    "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm";
  const types = {
    cancelled: `${baseClasses} bg-red-100 text-red-600`,
    completed: `${baseClasses} bg-green-100 text-green-600`,
    active: `${baseClasses} bg-blue-100 text-blue-600`,
  };
  const icons = {
    cancelled: <MdEventBusy />,
    completed: "✔",
    active: "🕒",
  };
  const labels = {
    cancelled: "Cancelled",
    completed: "Completed",
    active: "Active",
  };

  return (
    <span className={types[type]}>
      {icons[type]} {labels[type]}
    </span>
  );
};

/**
 * Appointment Row Component
 */
const AppointmentRow = ({ item, index, calculateAge, slotDateFormat, currency }) => {
  const navigate = useNavigate();

const handleClick = () => {
  navigate(`/appointments/${item._id}`, {
    state: {
      appointment: {
        patientName: item.userData.name,
        patientPhone: item.userData.phone || "N/A",
        patientAddress: item.userData.address || "N/A",
        patientImage: item.userData.image,
        patientAge: calculateAge(item.userData.dob),
        doctorName: item.docData.name,
        doctorSpeciality: item.docData.speciality || "General",
        doctorImage: item.docData.image,
        date: slotDateFormat(item.slotDate),
        time: item.slotTime,
        status: item.cancelled ? "Cancelled" : item.isCompleted ? "Completed" : "Pending",
        fees: currency + item.amount,
      },
    },
  });
};


  return (
    <div
      onClick={handleClick}
      className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 border border-gray-100 mb-4 cursor-pointer"
    >
      {/* Index */}
      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-bold text-gray-600">
        {index + 1}
      </div>

      {/* Patient */}
      <div className="flex items-center gap-3 flex-1 min-w-[150px]">
        <img
          src={item.userData.image}
          alt={item.userData.name}
          className="w-12 h-12 rounded-full object-cover shadow"
        />
        <div>
          <p className="font-semibold text-gray-800">{item.userData.name}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FaUser /> {calculateAge(item.userData.dob)} years
          </p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
        <FaCalendarAlt /> {slotDateFormat(item.slotDate)}, {item.slotTime}
      </div>

      {/* Doctor */}
      <div className="flex items-center gap-3 flex-1 min-w-[150px]">
        <img
          src={item.docData.image}
          alt={item.docData.name}
          className="w-12 h-12 rounded-full object-cover shadow"
        />
        <div>
          <p className="font-medium text-gray-700 flex items-center gap-1">
            <FaUserMd /> {item.docData.name}
          </p>
          <p className="text-xs text-gray-500">Assigned Doctor</p>
        </div>
      </div>

      {/* Fees */}
      <div className="flex items-center gap-1 text-green-600 font-semibold">
        <FaMoneyBillWave /> {currency}{item.amount}
      </div>

      {/* Status */}
      <div className="flex items-center">
        {item.cancelled ? (
          <StatusBadge type="cancelled" />
        ) : item.isCompleted ? (
          <StatusBadge type="completed" />
        ) : (
          <StatusBadge type="active" />
        )}
      </div>
    </div>
  );
};

/**
 * All Appointments Component
 */
const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments } = useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  return (
    <div className="w-full max-w-7xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 All Appointments</h1>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <MdEventBusy size={50} className="text-gray-400 mb-3" />
          <p>No appointments found</p>
        </div>
      ) : (
        <div>
          {appointments.map((item, index) => (
            <AppointmentRow
              key={item._id}
              item={item}
              index={index}
              calculateAge={calculateAge}
              slotDateFormat={slotDateFormat}
              currency={currency}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
