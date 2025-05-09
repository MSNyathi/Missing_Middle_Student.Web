// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard';
import Applicants from '../pages/admin/applicants';
import RegisterTechnician from '../pages/admin/register'; // registration page
import App from '../App'; // default landing component
import AssignDevicePage from '../pages/admin/Devices/AssignDevices/assignDevice';
import StudentDashboard from '../pages/student/dashboard';
import ApplyLaptop from '../pages/student/applyLaptop';
import TrackApplication from '../pages/student/trackApplication';
import Login from '../Login/Login'
import RegisterForm from '../pages/student/register/RegisterForm';
import SuccessPage from '../pages/student/register/SuccessPage';
import AdminLogin from '../Login/AdminLogin';

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

      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;
