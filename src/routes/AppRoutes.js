// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard';
import Applicants from '../pages/admin/applicants';
import App from '../App'; // default landing component
// import other pages here as needed

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/applicants" element={<Applicants />} />
      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;
