// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard';
import Applicants from '../pages/admin/applicants';
import RegisterTechnician from '../pages/admin/register'; // registration page
import App from '../App'; // default landing component
import AssignDevicePage from '../pages/admin/devices/AssignDevices/assignDevice';
// import other pages here as needed

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/applicants" element={<Applicants />} />
      <Route path="/admin/register" element={<RegisterTechnician />} />
      <Route path="/admin/assign-device" element={<AssignDevicePage />} />

      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;
