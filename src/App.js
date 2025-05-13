// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TechnicianDashboard from './components/TechnicianDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import { Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import SummaryCards from './components/SummaryCards';
import ChartsSection from './components/ChartsSection';
import DeviceTable from './components/DeviceTable';
import RegisterDevice from './components/RegisterDevice';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TechnicianDashboard />} />
        <Route path="/Devicetable" element={<DeviceTable />} />
        <Route path="/RegisterDevice" element={<RegisterDevice />} />
        {/* Future routes can be separated as components */}
      </Routes>
    </Router>
  );
}

export default App;
