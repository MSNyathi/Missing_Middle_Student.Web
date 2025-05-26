// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard';
import Applicants from '../pages/admin/applicants';
import RegisterTechnician from '../pages/admin/register'; // registration page
import App from '../App'; // default landing component
import AssignDevicePage from '../pages/admin/devices/AssignDevices/assignDevice'
import StudentDashboard from '../pages/student/dashboard';
import ApplyLaptop from '../pages/student/applyLaptop';
import TrackApplication from '../pages/student/trackApplication';
import Login from '../Login/Login'
import RegisterForm from '../pages/student/register/RegisterForm';
import SuccessPage from '../pages/student/register/SuccessPage';
import AdminLogin from '../Login/AdminLogin';
import ViewDevices from '../pages/admin/devices/viewDevices/viewDevice';
import ForgotPassword from '../pages/admin/login/forgotPassword'; // forgot password page
import Students from '../pages/admin/students/students';
import TechnicianDashboard from '../pages/Technician/TechnicianDashboard';
import DonatedLaptops from '../pages/Technician/donatedLaptops';
import TechnicianProfile from '../pages/admin/register/viewTechnicians'
import writtenOfLaptops from '../pages/Technician/writtenOfLaptops';
// import other pages here as needed


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/applicants" element={<Applicants />} />
      <Route path="/admin/register" element={<RegisterTechnician />} />
      <Route path="/admin/assign-device" element={<AssignDevicePage />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/student/apply" element={<ApplyLaptop />} />
      <Route path="/student/track" element={<TrackApplication />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/admin/devices/view-devices" element={<ViewDevices />} />      
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
      <Route path="/admin/technicians" element={<TechnicianProfile />} />
      <Route path="/technician/donatedLaptops" element={<DonatedLaptops />}/>
      <Route path="/technician/writtenOfLaptops" element={<writtenOfLaptops />}/>


      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;
