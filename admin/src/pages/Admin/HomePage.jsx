import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { AdminContext } from "../../context/AdminContext";
import DoctorHomePage from "../Doctor/DoctorHomePage";
import {
  FiHome,
  FiCalendar,
  FiUserPlus,
  FiUsers,
  FiFileText,
  FiSettings,
  FiBarChart2,
  FiHelpCircle,
} from "react-icons/fi";

const Homepage = () => {
  const navigate = useNavigate();
  const { dToken } = useContext(DoctorContext);
  const { 
    aToken, 
    doctors, 
    getAllDoctors, 
    appointments, 
    getAllAppointments,
    dashData,
    getDashData 
  } = useContext(AdminContext);
  
  const [stats, setStats] = useState({
    totalDoctors: 0,
    pendingAppointments: 0,
    activePatients: 0,
    totalAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aToken) {
      setLoading(true);
      Promise.all([
        getAllDoctors(),
        getAllAppointments(),
        getDashData()
      ]).finally(() => {
        setLoading(false);
      });
    }
  }, [aToken]);

  useEffect(() => {
    if (doctors || appointments || dashData) {
      calculateStats();
    }
  }, [doctors, appointments, dashData]);

  const calculateStats = () => {
    // Use dashData if available (from backend API), otherwise calculate from context data
    if (dashData) {
      const pendingAppointments = appointments?.filter(apt => 
        !apt.isCompleted && !apt.cancelled
      ).length || 0;

      setStats({
        totalDoctors: dashData.doctors || 0,
        pendingAppointments,
        activePatients: dashData.patients || 0,
        totalAppointments: dashData.appointments || 0
      });
    } else {
      // Fallback calculation from context data
      const totalDoctors = doctors?.length || 0;
      
      const pendingAppointments = appointments?.filter(apt => 
        !apt.isCompleted && !apt.cancelled
      ).length || 0;

      const uniquePatients = new Set(
        appointments?.map(apt => apt.userData?._id || apt.userId) || []
      );
      const activePatients = uniquePatients.size;

      const totalAppointments = appointments?.length || 0;

      setStats({
        totalDoctors,
        pendingAppointments,
        activePatients,
        totalAppointments
      });
    }
  };

  // If doctor is logged in, show doctor homepage
  if (dToken) {
    return <DoctorHomePage />;
  }

  const sections = [
    {
      title: "Dashboard Overview",
      description:
        "Quick summary of activities, performance, and system alerts.",
      icon: <FiHome size={24} />,
      color: "from-blue-500 to-blue-600",
      link: "/admin-dashboard",
    },
    {
      title: "Manage Appointments",
      description:
        "View, approve, and manage all patient appointments easily.",
      icon: <FiCalendar size={24} />,
      color: "from-green-500 to-green-600",
      link: "/all-appointments",
    },
    {
      title: "Add a Doctor",
      description:
        "Onboard new doctors with profile and schedule setup.",
      icon: <FiUserPlus size={24} />,
      color: "from-purple-500 to-purple-600",
      link: "/add-doctor",
    },
    {
      title: "Doctors List",
      description:
        "Browse and manage all registered doctors.",
      icon: <FiUsers size={24} />,
      color: "from-orange-500 to-orange-600",
      link: "/doctor-list",
    },
    {
      title: "Patient Records",
      description:
        "Securely view and update patient medical histories.",
      icon: <FiUsers size={24} />,
      color: "from-pink-500 to-pink-600",
      link: "/patients",
    },
    {
      title: "System Settings",
      description:
        "Manage security, preferences, and customization.",
      icon: <FiSettings size={24} />,
      color: "from-teal-500 to-teal-600",
      link: "/settings",
    },
    {
      title: "Reports & Analytics",
      description:
        "Generate detailed reports and track performance.",
      icon: <FiBarChart2 size={24} />,
      color: "from-indigo-500 to-indigo-600",
      link: "/reports",
    },
    {
      title: "Support & Help",
      description:
        "Access documentation, FAQs, and technical support.",
      icon: <FiHelpCircle size={24} />,
      color: "from-red-500 to-red-600",
      link: "/support",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Welcome Back, Admin 👋
        </h1>
        <p className="text-gray-600 mb-8">
          Your central hub for managing hospital operations efficiently.
        </p>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { 
              label: "Total Doctors", 
              value: loading ? "..." : stats.totalDoctors,
              icon: <FiUsers className="text-blue-600" size={20} />
            },
            { 
              label: "Pending Appointments", 
              value: loading ? "..." : stats.pendingAppointments,
              icon: <FiCalendar className="text-orange-600" size={20} />
            },
            { 
              label: "Active Patients", 
              value: loading ? "..." : stats.activePatients,
              icon: <FiUsers className="text-green-600" size={20} />
            },
            { 
              label: "Total Appointments", 
              value: loading ? "..." : stats.totalAppointments,
              icon: <FiBarChart2 className="text-purple-600" size={20} />
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow p-5 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {loading ? (
                      <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Main Feature Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <div
              key={index}
              onClick={() => navigate(section.link)}
              className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-5 cursor-pointer border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div
                className={`p-4 rounded-xl bg-gradient-to-br ${section.color} text-white flex items-center justify-center`}
              >
                {section.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {section.title}
                </h2>
                <p className="text-gray-600 mt-1 text-sm">{section.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        {!loading && appointments && appointments.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl shadow p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiCalendar className="text-blue-600" />
              Recent Appointments
            </h3>
            <div className="space-y-3">
              {appointments.slice(0, 5).map((appointment, index) => (
                <div key={appointment._id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FiUsers className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {appointment.userData?.name || "Patient"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Dr. {appointment.docData?.name || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">
                      {appointment.slotDate}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.slotTime}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      appointment.cancelled ? 'bg-red-100 text-red-600' :
                      appointment.isCompleted ? 'bg-green-100 text-green-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {appointment.cancelled ? 'Cancelled' :
                       appointment.isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/all-appointments")}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View All Appointments
            </button>
          </div>
        )}

        {/* Loading State for Recent Activity */}
        {loading && (
          <div className="mt-10 bg-white rounded-2xl shadow p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiCalendar className="text-blue-600" />
              Recent Appointments
            </h3>
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-1 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-3 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lower Info Section */}
        <div className="mt-14 bg-white rounded-2xl shadow p-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Need Assistance?
          </h3>
          <p className="text-gray-600 mb-6">
            If you encounter issues, visit the help center or contact the system administrator for support.
          </p>
          <button
            onClick={() => navigate("/support")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go to Help Center
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500 text-sm border-t border-gray-200 pt-4">
        © {new Date().getFullYear()} Hospital Admin Panel — Version 1.0.0
      </footer>
    </div>
  );
};

export default Homepage;
