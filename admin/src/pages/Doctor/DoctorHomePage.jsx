import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiClock,
  FiCheckCircle,
  FiHelpCircle,
} from "react-icons/fi";

const DoctorHomePage = () => {
  const navigate = useNavigate();
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);
  const [stats, setStats] = useState({
    todayAppointments: 0,
    pendingConsultations: 0,
    totalPatients: 0,
    completedToday: 0
  });
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  useEffect(() => {
    if (appointments && appointments.length > 0) {
      calculateStats();
      findNextAppointment();
    }
  }, [appointments]);

  const calculateStats = () => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    const todayAppointments = appointments.filter(apt => {
      try {
        if (!apt.slotDate) return false;
        const aptDate = new Date(apt.slotDate);
        if (isNaN(aptDate.getTime())) return false;
        const aptDateString = aptDate.toISOString().split('T')[0];
        return aptDateString === todayString;
      } catch (error) {
        return false;
      }
    });

    const pendingConsultations = appointments.filter(apt => 
      !apt.isCompleted && !apt.cancelled
    );

    const completedToday = appointments.filter(apt => {
      try {
        if (!apt.slotDate) return false;
        const aptDate = new Date(apt.slotDate);
        if (isNaN(aptDate.getTime())) return false;
        const aptDateString = aptDate.toISOString().split('T')[0];
        return aptDateString === todayString && apt.isCompleted;
      } catch (error) {
        return false;
      }
    });

    // Get unique patients based on userData from appointments
    const uniquePatients = new Set(appointments.map(apt => apt.userData?._id || apt.userId));

    setStats({
      todayAppointments: todayAppointments.length,
      pendingConsultations: pendingConsultations.length,
      totalPatients: uniquePatients.size,
      completedToday: completedToday.length
    });
  };

  const findNextAppointment = () => {
    const now = new Date();
    const upcoming = appointments
      .filter(apt => {
        try {
          if (apt.cancelled || apt.isCompleted) return false;
          if (!apt.slotDate || !apt.slotTime) return false;
          
          const aptDateTime = new Date(`${apt.slotDate} ${apt.slotTime}`);
          if (isNaN(aptDateTime.getTime())) return false;
          
          return aptDateTime > now;
        } catch (error) {
          return false;
        }
      })
      .sort((a, b) => {
        try {
          const dateA = new Date(`${a.slotDate} ${a.slotTime}`);
          const dateB = new Date(`${b.slotDate} ${b.slotTime}`);
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
          return dateA - dateB;
        } catch (error) {
          return 0;
        }
      });

    setNextAppointment(upcoming[0] || null);
  };

  const sections = [
    {
      title: "Dashboard Overview",
      description: "Quick summary of your appointments and patient activities.",
      icon: <FiHome size={24} />,
      color: "from-blue-500 to-blue-600",
      link: "/doctor-dashboard",
    },
    {
      title: "My Appointments",
      description: "View and manage your scheduled patient appointments.",
      icon: <FiCalendar size={24} />,
      color: "from-green-500 to-green-600",
      link: "/doctor-appointments",
    },
    {
      title: "My Profile",
      description: "Update your professional profile and availability.",
      icon: <FiUser size={24} />,
      color: "from-purple-500 to-purple-600",
      link: "/doctor-profile",
    },
    {
      title: "Support & Help",
      description: "Access documentation, FAQs, and technical support.",
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
          Welcome Back, Doctor 👨‍⚕️
        </h1>
        <p className="text-gray-600 mb-8">
          Your personal portal for managing appointments and patient care.
        </p>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Today's Appointments", value: stats.todayAppointments },
            { label: "Pending Consultations", value: stats.pendingConsultations },
            { label: "Total Patients", value: stats.totalPatients },
            { label: "Completed Today", value: stats.completedToday },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow p-5 border border-gray-100 hover:shadow-lg transition"
            >
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Feature Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
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

        {/* Quick Actions */}
        <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100 hover:shadow-lg transition cursor-pointer"
               onClick={() => navigate("/doctor-appointments")}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiClock className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">Next Appointment</p>
                <p className="text-sm text-gray-600">
                  {nextAppointment 
                    ? `${nextAppointment.slotTime} - ${nextAppointment.userData?.name || 'Patient'}`
                    : 'No upcoming appointments'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 border border-gray-100 hover:shadow-lg transition cursor-pointer"
               onClick={() => navigate("/doctor-appointments")}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiCheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">Completed Today</p>
                <p className="text-sm text-gray-600">{stats.completedToday} consultations</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 border border-gray-100 hover:shadow-lg transition cursor-pointer"
               onClick={() => navigate("/doctor-profile")}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiUser className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">Total Patients</p>
                <p className="text-sm text-gray-600">{stats.totalPatients} unique patients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Info Section */}
        <div className="mt-14 bg-white rounded-2xl shadow p-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Need Assistance?
          </h3>
          <p className="text-gray-600 mb-6">
            If you encounter issues with appointments or need technical support, contact the system administrator.
          </p>
          <button
            onClick={() => navigate("/support")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Help
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500 text-sm border-t border-gray-200 pt-4">
        © {new Date().getFullYear()} Doctor Portal — Version 1.0.0
      </footer>
    </div>
  );
};

export default DoctorHomePage;
