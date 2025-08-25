import React, { useContext } from 'react'
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import Login from './pages/Login';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import AdminDoctorProfile from './pages/Admin/DoctorProfile';
import Homepage from './pages/Admin/HomePage';
import AdminNewsManager from './pages/Admin/AdminNewsManager';
import AppointmentDetails from './pages/Admin/AppointmentDetails';
import AdminNewsList from './pages/Admin/AdminNewsList';
import PatientsList from './pages/Admin/PatientsList';
const App = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD] min-h-screen'>
      <ToastContainer />
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 ml-64 pt-16'>
          <div className='p-6'>
            <Routes>
              <Route path='/' element={<Homepage/>} />
              <Route path='/news' element={<AdminNewsManager/>} />
               <Route path='/newslist' element={<AdminNewsList/>} />
              <Route path='/admin-dashboard' element={<Dashboard />} />
              <Route path='/all-appointments' element={<AllAppointments />} />
              <Route path='/add-doctor' element={<AddDoctor />} />
              <Route path='/doctor-list' element={<DoctorsList />} />
              <Route path='/patients-list' element={<PatientsList />} />
              <Route path='/doctor-profile/:doctorId' element={<AdminDoctorProfile />} />
              <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
              <Route path='/doctor-appointments' element={<DoctorAppointments />} />
              <Route path='/doctor-profile' element={<DoctorProfile />} />
               <Route path="/appointments/:id" element={<AppointmentDetails />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App