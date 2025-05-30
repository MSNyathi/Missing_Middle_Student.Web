// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App'; // default landing component

import StudentDashboard from '../pages/student/dashboard';
import ApplyLaptop from '../pages/student/applyLaptop';
import TrackApplication from '../pages/student/trackApplication';
import Login from '../pages/student/login/studentLogin'
import RegisterForm from '../pages/student/register/RegisterForm';
import SuccessPage from '../pages/student/register/SuccessPage';

import Dashboard from '../pages/admin/dashboard';
import Applicants from '../pages/admin/applicants';
import RegisterTechnician from '../pages/admin/register'; // registration page

import AssignDevicePage from '../pages/admin/devices/AssignDevices/assignDevice'
import AdminLogin from '../pages/admin/login/adminLogin';
import ViewDevices from '../pages/admin/devices/viewDevices/viewDevice';
import ForgotPassword from '../pages/admin/login/forgotPassword'; // forgot password page
import Students from '../pages/admin/students/students';
import TechnicianProfile from '../pages/admin/register/viewTechnicians';

import TechnicianDashboard from '../pages/Technician/TechnicianDashboard';
import DonatedLaptops from '../pages/Technician/donatedLaptops';
import RegisterDevice from '../pages/Technician/registerDevice';
import WrittenOffDevices from '../pages/Technician/writtenOfLaptops';
import RegisterDeviceForm from '../pages/Technician/addDevice';


import SupervisorLogin from '../pages/supervisor/Login/SupervisorLogin';
import SupervisorDashboard from '../pages/supervisor/Dashboard/SupervisorDashboard';
import DonationRequests from '../pages/supervisor/Dashboard/DonationRequests';
import AddReceivedDevices from '../pages/supervisor/Dashboard/AddReceivedDevices';
import SendDevicesToTechnician from '../pages/supervisor/Dashboard/SendDevicesToTechnician'; 
import ViewReports from '../pages/supervisor/Dashboard/ViewReports';

import DonorDashboard from '../pages/donor/donorDashboard';
import DonationRequest from '../pages/donor/donationRequest';
import DonationHistory from '../pages/donor/donorHistory';
import DonorLogin from '../pages/donor/donorLogin';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      
      {/* STUDENT */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/apply" element={<ApplyLaptop />} />
      <Route path="/student/track" element={<TrackApplication />} />
      <Route path="/student/login" element={<Login />} />      
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* ADMIN */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/applicants" element={<Applicants />} />
      <Route path="/admin/register" element={<RegisterTechnician />} />
      <Route path="/admin/assign-device" element={<AssignDevicePage />} />
      <Route path="/admin/devices/view-devices" element={<ViewDevices />} />      
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/technicians" element={<TechnicianProfile />} />
      
      {/* TECHNICIAN */}
      <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
      <Route path="/technician/donatedLaptops" element={<DonatedLaptops />} />
      <Route path="/technician/registerDevice" element={<RegisterDevice />} />
      <Route path="/technician/writtenOfLaptops" element={<WrittenOffDevices />} />
      <Route path="/technician/add-device" element={<RegisterDeviceForm />} />
            
      {/* SUPERVISOR */}
      <Route path="/supervisor/donation-requests" element={<DonationRequests />} />
      <Route path="/supervisor/add-received-devices" element={<AddReceivedDevices />} />
      <Route path="/supervisor/send-devices-to-technician" element={<SendDevicesToTechnician />} />
      <Route path="/supervisor/view-reports" element={<ViewReports />} />
      <Route path="/supervisor/login" element={<SupervisorLogin />} />
      <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />

      {/* DONATOR */}
      <Route path='/donor/dashboard' element={<DonorDashboard/>}/>
      <Route path='/donor/request' element={<DonationRequest/>}/>
      <Route path='/donor/history' element={<DonationHistory/>}/>
      <Route path='/donor/login' element={<DonorLogin/>}/>
    </Routes>
  );
};

export default AppRoutes;
