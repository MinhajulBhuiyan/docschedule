import React, { useEffect, useContext, useCallback } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import {
  FaUser,
  FaUserMd,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
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
    completed: <FaCheckCircle />,
    active: <FaTimesCircle />,
  };
  const labels = {
    cancelled: "Cancelled",
    completed: "Completed",
    active: "Cancel",
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
const AppointmentRow = ({
  item,
  index,
  calculateAge,
  slotDateFormat,
  currency,
  cancelAppointment,
}) => {
  const handleCancel = useCallback(() => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      cancelAppointment(item._id);
    }
  }, [item._id, cancelAppointment]);

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-100 mb-4"
    >
      {/* Index Number */}
      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-bold text-gray-600">
        {index + 1}
      </div>

      {/* Patient Info */}
      <div className="flex items-center gap-3 flex-1 min-w-[150px]">
        <img
          src={item.userData.image}
          alt={item.userData.name}
          className="w-12 h-12 rounded-full object-cover shadow"
        />
        <div>
          <p className="font-semibold text-gray-800">{item.userData.name}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FaUser /> {calculateAge(item.userData.dob)} years old
          </p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
        <FaCalendarAlt />
        {slotDateFormat(item.slotDate)}, {item.slotTime}
      </div>

      {/* Doctor Info */}
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

      {/* Status / Actions */}
      <div className="flex items-center">
        {item.cancelled ? (
          <StatusBadge type="cancelled" />
        ) : item.isCompleted ? (
          <StatusBadge type="completed" />
        ) : (
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md"
          >
            <FaTimesCircle /> Cancel
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * All Appointments List Component
 */
const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } =
    useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  return (
    <div className="w-full max-w-7xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📋 All Appointments
      </h1>

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
              cancelAppointment={cancelAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
