// src/components/adminNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './adminNavbar.css'

const AdminNavbar = () => {
  return (
    <div className="d-flex flex-column vh-100 p-3 bg-primary text-white" style={{ width: '220px' }}>
      <h2 className="mb-4">📘 eduConnect</h2>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link text-white">🏠 Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/applicants" className="nav-link text-white">📄 Applications</Link>
        </li>

         {/* Devices Dropdown (Hover-enabled) */}
         <li className="nav-item dropdown hover-dropdown">
          <div className="nav-link text-white dropdown-toggle" role="button">
            💻 Devices
          </div>
          <ul className="dropdown-menu show-on-hover">
            <li><Link to="/admin/assign-device" className="dropdown-item">Assign Devices</Link></li>
            <li><Link to="/admin/devices/view" className="dropdown-item">View Devices</Link></li>
          </ul>
        </li>


        <li className="nav-item">
          <Link to="/admin/register" className="nav-link text-white">📝 Register</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/students" className="nav-link text-white">👨‍🎓 Students</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">🚪 Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
