// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App'; // default landing component

import StudentDashboard from '../pages/student/dashboard';
import ApplyLaptop from '../pages/student/applyLaptop';
import TrackApplication from '../pages/student/trackApplication';
import HelpPageLaptops from '../pages/student/help/helpPage'; // help page
import RegisterForm from '../pages/student/register/RegisterForm';
import SuccessPage from '../pages/student/register/SuccessPage';

import Dashboard from '../pages/admin/dashboard';
import Applicants from '../pages/admin/applicants';
import RegisterTechnician from '../pages/admin/register'; // registration page


import AdminLogin from '../pages/admin/login/adminLogin';
import ViewDevices from '../pages/admin/devices/viewDevices/viewDevice';
import ForgotPassword from '../pages/admin/login/forgotPassword'; // forgot password page
import StudentForgotPassword from '../pages/student/login/studentforgotPassword'; // forgot password page
import Collection from '../pages/admin/collect/deviceCollection';
import AssignDevicePage from '../pages/admin/devices/AssignDevices/assignDevice'; // assign device page


import TechnicianDashboard from '../pages/Technician/TechnicianDashboard';
import TechnicianProfile from '../pages/admin/register/viewTechnicians'
import StudentLogin from '../pages/student/login/studentLogin';

// import other pages here as needed
import DonatedLaptops from '../pages/Technician/donatedLaptops';
import RegisterDevice from '../pages/Technician/registerDevice';
import WrittenOffDevices from '../pages/Technician/writtenOfLaptops';
import Contact from '../pages/student/help/contact'; // contact page for help
import Distribution from '../pages/student/help/distribution';
import Security from '../pages/student/help/security';
import Warranty from '../pages/student/help/warranty';
import StudentLaptopForm from '../pages/student/contract/studentContract'; // student contract page

import SupervisorLogin from '../pages/supervisor/Login/SupervisorLogin';
import SupervisorDashboard from '../pages/supervisor/Dashboard/SupervisorDashboard';
import DonationRequests from '../pages/supervisor/Dashboard/DonationRequests';
import AddReceivedDevices from '../pages/supervisor/Dashboard/AddReceivedDevices';
import SendDevicesToTechnician from '../pages/supervisor/Dashboard/SendDevicesToTechnician'; 
import ViewReports from '../pages/supervisor/Dashboard/ViewReports';
import SupervisorNotifications from '../pages/supervisor/Dashboard/SupervisorSidebar/SupervisorNotifications';

import Login from "../pages/student/login/studentLogin";
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
      <Route path="/student/help/contact" element={<Contact />} />
      <Route path="/student/help/distribution" element={<Distribution />} />
      <Route path="/student/help" element={<HelpPageLaptops />} />
      <Route path="/student/help/security" element={<Security />} />
      <Route path="/student/help/warranty" element={<Warranty />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/apply" element={<ApplyLaptop />} />
      <Route path="/student/track" element={<TrackApplication />} />
      <Route path="/student/help" element={<HelpPageLaptops />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/login/forgot-password" element={<StudentForgotPassword />} />
      <Route path="/student/contract" element={<StudentLaptopForm />} />
      
      {/* ADMIN */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/applicants" element={<Applicants />} />
      <Route path="/admin/register" element={<RegisterTechnician />} />
      <Route path="/admin/assign-device" element={<AssignDevicePage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/admin/devices/view-devices" element={<ViewDevices />} />      
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/collection" element={<Collection />} />
      <Route path="/admin/technicians" element={<TechnicianProfile />} />
      
      {/* TECHNICIAN */}
      <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
      <Route path="/admin/technicians" element={<TechnicianProfile />} />
   

      <Route path="/technician/donatedLaptops" element={<DonatedLaptops />} />
      <Route path="/technician/registerDevice" element={<RegisterDevice />} />
      <Route path="/technician/writtenOfLaptops" element={<WrittenOffDevices />} />
    
            
      {/* SUPERVISOR */}
      <Route path="/supervisor/donation-requests" element={<DonationRequests />} />
      <Route path="/supervisor/add-received-devices" element={<AddReceivedDevices />} />
      <Route path="/supervisor/send-devices-to-technician" element={<SendDevicesToTechnician />} />
      <Route path="/supervisor/view-reports" element={<ViewReports />} />
      <Route path="/supervisor/login" element={<SupervisorLogin />} />
      <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
      <Route path="/supervisor/notifications" element={<SupervisorNotifications />} />

      {/* DONATOR */}
      <Route path='/donor/dashboard' element={<DonorDashboard/>}/>
      <Route path='/donor/request' element={<DonationRequest/>}/>
      <Route path='/donor/history' element={<DonationHistory/>}/>
      <Route path='/donor/login' element={<DonorLogin/>}/>
    </Routes>
  );
};

export default AppRoutes;
