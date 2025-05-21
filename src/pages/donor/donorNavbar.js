import React from 'react';
import { Link } from 'react-router-dom';
import './DonorNavbar.css';

const DonorNavbar = () => {
  return (
    <div className="d-flex flex-column vh-100 p-3 bg-primary text-white" style={{ width: '220px' }}>
      <h2 className="mb-4">📘 eduConnect</h2>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <Link to="/donor/dashboard" className="nav-link text-white">🏠 Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/donor/donate" className="nav-link text-white">📄 Donation Request</Link>
        </li>
        <li className="nav-item">
          <Link to="/donor/instructions" className="nav-link text-white">📄 Instructions</Link>
        </li>        
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">🚪 Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default DonorNavbar;
