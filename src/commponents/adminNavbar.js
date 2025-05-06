// src/components/adminNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

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
        <li className="nav-item">
          <Link to="/admin/devices" className="nav-link text-white">💻 Devices</Link>
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
