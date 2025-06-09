import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png'
import {
  FaHome, FaPlusSquare, FaLaptop, FaSignOutAlt,
  FaTrash, FaTruck, FaCloudUploadAlt, FaCog
} from 'react-icons/fa';

const Sidebar = () => (
  <div className="sidebar bg-primary text-white p-3" style={{ minHeight: '118vh', width: '250px', padding: 0 }}>
    <div className="mb-4">
      <img
        src={logo}
        alt="TUT Logo"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <h5>EduConnect</h5>
    </div>
    <Nav className="flex-column gap-2">
      <Nav.Link as={Link} to="/technician/dashboard" className="text-white d-flex align-items-center gap-2">
        <FaHome /> Dashboard
      </Nav.Link>
      <Nav.Link as={Link} to="/technician/registerDevice" className="text-white d-flex align-items-center gap-2">
        <FaPlusSquare /> Register Device
      </Nav.Link>
      <Nav.Link as={Link} to="/technician/donatedLaptops" className="text-white d-flex align-items-center gap-2">
        <FaLaptop /> Donated Laptops
      </Nav.Link>
      <Nav.Link as={Link} to="/technician/writtenOfLaptops" className="text-white d-flex align-items-center gap-2">
        <FaTrash /> Written Off Laptops
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/login" className="text-white d-flex align-items-center gap-2">
        <FaSignOutAlt /> Logout
      </Nav.Link>
    </Nav>
  </div>
);

export default Sidebar;
