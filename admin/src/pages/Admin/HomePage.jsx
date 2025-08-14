import React from "react";
import { useNavigate } from "react-router-dom";
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
            { label: "Total Doctors", value: "42" },
            { label: "Pending Appointments", value: "16" },
            { label: "Active Patients", value: "320" },
            { label: "System Uptime", value: "99.99%" },
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
