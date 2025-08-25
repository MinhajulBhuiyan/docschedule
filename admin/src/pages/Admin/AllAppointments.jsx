import React, { useEffect, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { 
  FaUser, 
  FaUserMd, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaCheck, 
  FaClock,
  FaClipboardList,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFilter
} from "react-icons/fa";
import { MdEventBusy } from "react-icons/md";

/**
 * Sortable Header Component
 */
const SortableHeader = ({ label, sortKey, currentSort, onSort, className = "" }) => {
  const getSortIcon = () => {
    if (currentSort.key !== sortKey) {
      return <FaSort className="w-3 h-3 text-gray-400" />;
    }
    return currentSort.direction === 'asc' 
      ? <FaSortUp className="w-3 h-3 text-blue-600" />
      : <FaSortDown className="w-3 h-3 text-blue-600" />;
  };

  return (
    <div 
      className={`flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <span>{label}</span>
      {getSortIcon()}
    </div>
  );
};

/**
 * Status Filter Component
 */
const StatusFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All', count: 0 },
    { key: 'active', label: 'Active', count: 0 },
    { key: 'completed', label: 'Completed', count: 0 },
    { key: 'cancelled', label: 'Cancelled', count: 0 }
  ];

  return (
    <div className="flex items-center gap-2 mb-4">
      <FaFilter className="w-4 h-4 text-gray-500" />
      <span className="text-sm font-medium text-gray-700 mr-2">Filter:</span>
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            activeFilter === filter.key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
const StatusBadge = ({ type }) => {
  const baseClasses =
    "px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all duration-200";
  const types = {
    cancelled: `${baseClasses} bg-red-50 text-red-700 border border-red-200`,
    completed: `${baseClasses} bg-green-50 text-green-700 border border-green-200`,
    active: `${baseClasses} bg-blue-50 text-blue-700 border border-blue-200`,
  };
  const icons = {
    cancelled: <MdEventBusy className="w-3 h-3" />,
    completed: <FaCheck className="w-3 h-3" />,
    active: <FaClock className="w-3 h-3" />,
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
      className="grid grid-cols-12 gap-6 p-4 bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer items-center border-b border-gray-100 last:border-b-0"
    >
      {/* Index */}
      <div className="col-span-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center font-semibold text-blue-700 text-sm border border-blue-200">
          {index + 1}
        </div>
      </div>

      {/* Patient */}
      <div className="col-span-3 flex items-center gap-3">
        <img
          src={item.userData.image}
          alt={item.userData.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{item.userData.name}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <FaUser className="w-3 h-3" /> {calculateAge(item.userData.dob)} years
          </p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="col-span-2 flex items-center gap-2">
        <FaCalendarAlt className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <div className="min-w-0">
          <p className="font-medium text-gray-900 text-sm">{slotDateFormat(item.slotDate)}</p>
          <p className="text-xs text-gray-500">{item.slotTime}</p>
        </div>
      </div>

      {/* Doctor */}
      <div className="col-span-3 flex items-center gap-3">
        <img
          src={item.docData.image}
          alt={item.docData.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 text-sm flex items-center gap-1 truncate">
            <FaUserMd className="w-3 h-3 text-blue-600" /> {item.docData.name}
          </p>
          <p className="text-xs text-gray-500">Doctor</p>
        </div>
      </div>

      {/* Fees */}
      <div className="col-span-1 flex items-center justify-center gap-1">
        <FaMoneyBillWave className="w-4 h-4 text-green-600" />
        <span className="font-semibold text-green-700 text-sm">{currency}{item.amount}</span>
      </div>

      {/* Status */}
      <div className="col-span-2 flex items-center justify-center">
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
  
  // Sorting and filtering state
  const [sortConfig, setSortConfig] = useState({ key: 'slotDate', direction: 'desc' });
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  // Sorting function
  const handleSort = (key) => {
    console.log('Sorting by:', key, 'Current data sample:', appointments[0]); // Debug log
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Filtered and sorted appointments
  const processedAppointments = useMemo(() => {
    let filtered = [...appointments];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(appointment => {
        if (statusFilter === 'cancelled') return appointment.cancelled;
        if (statusFilter === 'completed') return appointment.isCompleted;
        if (statusFilter === 'active') return !appointment.cancelled && !appointment.isCompleted;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortConfig.key) {
        case 'slotDate':
          // Handle different date formats
          aValue = new Date(a.slotDate);
          bValue = new Date(b.slotDate);
          
          // If date parsing fails, try alternative parsing
          if (isNaN(aValue.getTime())) {
            aValue = new Date(a.slotDate.replace(/(\d{1,2})_(\d{1,2})_(\d{4})/, '$3-$2-$1'));
          }
          if (isNaN(bValue.getTime())) {
            bValue = new Date(b.slotDate.replace(/(\d{1,2})_(\d{1,2})_(\d{4})/, '$3-$2-$1'));
          }
          break;
          
        case 'amount':
          aValue = parseFloat(a.amount) || 0;
          bValue = parseFloat(b.amount) || 0;
          break;
          
        default:
          return 0;
      }

      // Handle invalid dates
      if (sortConfig.key === 'slotDate') {
        if (isNaN(aValue.getTime()) && isNaN(bValue.getTime())) return 0;
        if (isNaN(aValue.getTime())) return 1;
        if (isNaN(bValue.getTime())) return -1;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [appointments, sortConfig, statusFilter]);

  // Get filter counts
  const filterCounts = useMemo(() => {
    return {
      all: appointments.length,
      active: appointments.filter(a => !a.cancelled && !a.isCompleted).length,
      completed: appointments.filter(a => a.isCompleted).length,
      cancelled: appointments.filter(a => a.cancelled).length
    };
  }, [appointments]);

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaClipboardList className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">All Appointments</h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {processedAppointments.length} of {appointments.length}
          </span>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-gray-200">
          <MdEventBusy className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-500 font-medium">No appointments found</p>
          <p className="text-gray-400 text-sm mt-1">Appointments will appear here once scheduled</p>
        </div>
      ) : (
        <>
          {/* Status Filter */}
          <StatusFilter activeFilter={statusFilter} onFilterChange={setStatusFilter} />
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-6 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700 text-sm items-center">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-3">Patient</div>
              <div className="col-span-2">
                <SortableHeader 
                  label="Date & Time" 
                  sortKey="slotDate" 
                  currentSort={sortConfig} 
                  onSort={handleSort} 
                />
              </div>
              <div className="col-span-3">Doctor</div>
              <div className="col-span-1 text-center">
                <SortableHeader 
                  label="Fees" 
                  sortKey="amount" 
                  currentSort={sortConfig} 
                  onSort={handleSort} 
                  className="justify-center"
                />
              </div>
              <div className="col-span-2 text-center">Status</div>
            </div>
            
            {/* Appointment Rows */}
            <div>
              {processedAppointments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <MdEventBusy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No appointments match the current filter</p>
                </div>
              ) : (
                processedAppointments.map((item, index) => (
                  <AppointmentRow
                    key={item._id}
                    item={item}
                    index={index}
                    calculateAge={calculateAge}
                    slotDateFormat={slotDateFormat}
                    currency={currency}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllAppointments;
