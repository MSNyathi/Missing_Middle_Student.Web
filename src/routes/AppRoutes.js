import React from "react";
import { Routes, Route } from "react-router-dom";

// Admin pages
import Dashboard from "../pages/admin/dashboard";
import Applicants from "../pages/admin/applicants";
import RegisterTechnician from "../pages/admin/register";
import AssignDevicePage from "../pages/admin/devices/AssignDevices/assignDevice";
import ViewDevices from "../pages/admin/devices/viewDevices/viewDevice";
import Students from "../pages/admin/students/students";
import TechnicianProfile from "../pages/admin/register/viewTechnicians";
import ForgotPassword from "../pages/admin/login/forgotPassword";
import AdminLogin from "../pages/admin/login/adminLogin";

// Student pages
import StudentDashboard from "../pages/student/dashboard";
import ApplyLaptop from "../pages/student/applyLaptop";
import TrackApplication from "../pages/student/trackApplication";
import HelpPageLaptops from "../pages/student/help/helpPage";
import RegisterForm from "../pages/student/register/RegisterForm";
import SuccessPage from "../pages/student/register/SuccessPage";
import StudentLogin from "../pages/student/login/studentLogin";
import StudentForgotPassword from "../pages/student/login/studentforgotPassword";

// Technician pages
import TechnicianDashboard from "../pages/Technician/TechnicianDashboard";
import RegisterDevice from "../pages/Technician/registerDevice";
import WrittenOfLaptops from "../pages/Technician/writtenOfLaptops";
import DonatedLaptops from "../pages/Technician/donatedLaptops";

// Donor pages
import DonorDashboard from "../pages/donor/donorDashboard";
import DonorLogin from "../pages/donor/donorLogin";
import DonationRequest from "../pages/donor/donationRequest";
import DonorForm from "../pages/donor/donorForm";
import DonorHistory from "../pages/donor/donorHistory";

// Default App landing
import App from "../App";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Common */}
      <Route path="/" element={<App />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/applicants" element={<Applicants />} />
      <Route path="/admin/register" element={<RegisterTechnician />} />
      <Route path="/admin/assign-device" element={<AssignDevicePage />} />
      <Route path="/admin/devices/view-devices" element={<ViewDevices />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/technicians" element={<TechnicianProfile />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />

      {/* Student Routes */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/apply" element={<ApplyLaptop />} />
      <Route path="/student/track" element={<TrackApplication />} />
      <Route path="/student/help" element={<HelpPageLaptops />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/login/forgot-password" element={<StudentForgotPassword />} />

      {/* Technician Routes */}
      <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
      <Route path="/technician/registerDevice" element={<RegisterDevice />} />
      <Route path="/technician/writtenOfLaptops" element={<WrittenOfLaptops />} />
      <Route path="/technician/donatedLaptops" element={<DonatedLaptops />} />

      {/* Donor Routes */}
      <Route path="/donor/dashboard" element={<DonorDashboard />} />
      <Route path="/donorLogin" element={<DonorLogin />} />
      <Route path="/donor/request" element={<DonationRequest />} />
      <Route path="/form" element={<DonorForm />} />
      <Route path="/donor/history" element={<DonorHistory />} />

      {/* Add more routes here as needed */}
    </Routes>
  );
};

export default AppRoutes;
