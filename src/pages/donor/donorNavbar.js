import React from 'react';
import { Link } from 'react-router-dom';
import './DonorNavbar.css';

const DonorNavbar = () => {
  return (
    <div className="d-flex flex-column vh-100 p-3 bg-primary text-white" style={{ width: '220px' }}>
      <h2 className="mb-4">📘 eduConnect</h2>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <Link to="/donor/dashboard" className="nav-link text-white">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/donor/request" className="nav-link text-white"> Donation Request</Link>
        </li>     
        <li className="nav-item">
          <Link to="/donor/history" className="nav-link text-white"> Donation History</Link>
        </li>    
        <li className="nav-item">
          <Link to="/" className="nav-link text-white"> Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default DonorNavbar;
