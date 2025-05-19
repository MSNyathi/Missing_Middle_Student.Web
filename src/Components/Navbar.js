// src/Components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional if you want to style it

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Student Portal</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/ApplyLaptop">Apply for Laptop</Link></li>
        <li><Link to="/TrackApplication">Track Application</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
