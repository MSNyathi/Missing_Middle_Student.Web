import React from "react";
import { Routes, Route } from "react-router-dom";

// Admin pages


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
