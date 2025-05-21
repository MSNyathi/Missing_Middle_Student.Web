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

import HelpPageLaptops from '../pages/student/help/helpPage'; // help page









import Login from '../Login/Login'
import RegisterForm from '../pages/student/register/RegisterForm';
import SuccessPage from '../pages/student/register/SuccessPage';
import AdminLogin from '../pages/admin/login/adminLogin';
import ViewDevices from '../pages/admin/devices/viewDevices/viewDevice';
import ForgotPassword from '../pages/admin/login/forgotPassword'; // forgot password page
import Students from '../pages/admin/students/students';
import TechnicianProfile from '../pages/admin/register/viewTechnicians'
import StudentLogin from '../pages/student/login/studentLogin';

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
      <Route path="/student/help" element={<HelpPageLaptops />} />
      <Route path="/student/login" element={<StudentLogin />} />



 
  


      
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/admin/devices/view-devices" element={<ViewDevices />} />
      
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/technicians" element={<TechnicianProfile />} />


      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;
