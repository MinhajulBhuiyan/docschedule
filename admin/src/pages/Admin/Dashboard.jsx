import React, { useContext, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { 
  FaUserMd, 
  FaCalendarAlt, 
  FaUsers, 
  FaChevronRight,
  FaEye,
  FaTimes,
  FaStethoscope,
  FaChartBar,
  FaClock
} from 'react-icons/fa'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData, doctors, getAllDoctors } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (aToken) {
      getDashData()
      getAllDoctors()
    }
  }, [aToken])

  // Calculate additional stats
  const additionalStats = useMemo(() => {
    if (!dashData?.latestAppointments) return null;
    
    const today = new Date().toDateString();
    const todayAppointments = dashData.latestAppointments.filter(
      apt => new Date(apt.slotDate).toDateString() === today
    ).length;
    
    const completedAppointments = dashData.latestAppointments.filter(
      apt => apt.isCompleted
    ).length;
    
    const cancelledAppointments = dashData.latestAppointments.filter(
      apt => apt.cancelled
    ).length;
    
    const activeAppointments = dashData.latestAppointments.filter(
      apt => !apt.cancelled && !apt.isCompleted
    ).length;

    return {
      todayAppointments,
      completedAppointments,
      cancelledAppointments,
      activeAppointments
    };
  }, [dashData]);

  // Calculate department statistics from real doctor data
  const departmentStats = useMemo(() => {
    if (!doctors || doctors.length === 0) return {};
    
    const stats = {};
    doctors.forEach(doctor => {
      const speciality = doctor.speciality || 'General Medicine';
      stats[speciality] = (stats[speciality] || 0) + 1;
    });
    
    return stats;
  }, [doctors]);

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path)
  }

  // Stats card component
  const StatsCard = ({ icon, count, label, path, bgColor, iconColor, isImage = false }) => (
    <div 
      onClick={() => handleNavigation(path)}
      className={`group relative overflow-hidden bg-white rounded-xl border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
            {isImage ? (
              <img src={icon} alt={label} className={`w-6 h-6 ${iconColor}`} />
            ) : (
              React.cloneElement(icon, { className: `w-6 h-6 ${iconColor}` })
            )}
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{count}</p>
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        </div>
        <FaChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </div>
  )

  return dashData && (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          icon={<FaUserMd />}
          count={dashData.doctors}
          label="Total Doctors"
          path="/doctor-list"
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          icon={<FaCalendarAlt />}
          count={dashData.appointments}
          label="Total Appointments"
          path="/all-appointments"
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          icon={assets.patient_profile_people}
          count={dashData.patients}
          label="Total Patients"
          path="/patients-list"
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
          isImage={true}
        />
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaClock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Today's Overview</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Today's Appointments</span>
              <span className="font-semibold text-blue-600">{additionalStats?.todayAppointments || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Appointments</span>
              <span className="font-semibold text-green-600">{additionalStats?.activeAppointments || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed Today</span>
              <span className="font-semibold text-purple-600">{additionalStats?.completedAppointments || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cancelled</span>
              <span className="font-semibold text-red-600">{additionalStats?.cancelledAppointments || 0}</span>
            </div>
          </div>
        </div>

        {/* Department Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FaStethoscope className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Department Stats</h3>
          </div>
          <div className="space-y-4">
            {Object.keys(departmentStats).length > 0 ? (
              Object.entries(departmentStats)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 6)
                .map(([speciality, count], index) => {
                  const colors = [
                    'text-blue-600',
                    'text-red-600', 
                    'text-green-600',
                    'text-purple-600',
                    'text-orange-600',
                    'text-indigo-600'
                  ];
                  return (
                    <div key={speciality} className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">{speciality}</span>
                      <span className={`font-semibold ${colors[index % colors.length]}`}>
                        {count}
                      </span>
                    </div>
                  );
                })
            ) : (
              <div className="text-center text-gray-500 text-sm">
                No department data available
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaChartBar className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/add-doctor')}
              className="w-full p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Add New Doctor
            </button>
            <button 
              onClick={() => navigate('/all-appointments')}
              className="w-full p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              View All Appointments
            </button>
            <button 
              onClick={() => navigate('/patients-list')}
              className="w-full p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Manage Patients
            </button>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaCalendarAlt className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Latest Bookings</h2>
              <p className="text-sm text-gray-500">Recent appointment activities</p>
            </div>
          </div>
          <button
            onClick={() => handleNavigation('/all-appointments')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            <FaEye className="w-4 h-4" />
            View All
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div 
              key={index}
              onClick={() => navigate(`/appointments/${item._id}`)}
              className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <img 
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
                src={item.docData.image} 
                alt={item.docData.name}
              />
              <div className="flex-1 ml-4 min-w-0">
                <p className="font-medium text-gray-900 truncate">{item.docData.name}</p>
                <p className="text-sm text-gray-500">Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              <div className="flex items-center gap-3">
                {item.cancelled ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                    <FaTimes className="w-3 h-3" />
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                    ✓ Completed
                  </span>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      cancelAppointment(item._id)
                    }}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Cancel Appointment"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
                <FaChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {dashData.latestAppointments.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <FaCalendarAlt className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No recent appointments</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard