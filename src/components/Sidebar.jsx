import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaHome, FaPlusSquare, FaLaptop, FaSignOutAlt,
  FaTrash, FaSyncAlt, FaTruck, FaCloudUploadAlt, FaCog
} from 'react-icons/fa';

const Sidebar = () => (
  <div className="sidebar bg-primary text-white p-3" style={{ minHeight: '100vh', width: '250px' }}>
    <div className="mb-4">
      <img
        src="/tut-logo.png"
        alt="TUT Logo"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <h5>Technician</h5>
    </div>
    <Nav className="flex-column gap-2">
      <Nav.Link as={Link} to="/technician/dashboard" className="text-white d-flex align-items-center gap-2">
        <FaHome /> Dashboard
      </Nav.Link>
      <Nav.Link as={Link} to="/refurbishmentProgress" className="text-white d-flex align-items-center gap-2">
        <FaSyncAlt /> Refurbishment Progress
      </Nav.Link>
      <Nav.Link as={Link} to="/devices" className="text-white d-flex align-items-center gap-2">
        <FaLaptop /> Donated Laptops
      </Nav.Link>
      <Nav.Link as={Link} to="/writtenOffLaptops" className="text-white d-flex align-items-center gap-2">
        <FaTrash /> Written Off Laptops
      </Nav.Link>
      <Nav.Link as={Link} to="/logistics" className="text-white d-flex align-items-center gap-2">
        <FaTruck /> Logistics Liaison
      </Nav.Link>
      <Nav.Link as={Link} to="/uploadMissing" className="text-white d-flex align-items-center gap-2">
        <FaCloudUploadAlt /> Upload to Middle Missing
      </Nav.Link>
      <Nav.Link as={Link} to="/settings" className="text-white d-flex align-items-center gap-2">
        <FaCog /> Settings
      </Nav.Link>
      <Nav.Link as={Link} to="/logout" className="text-white d-flex align-items-center gap-2">
        <FaSignOutAlt /> Logout
      </Nav.Link>
    </Nav>
  </div>
);

export default Sidebar;
