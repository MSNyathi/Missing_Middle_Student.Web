import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaLaptopCode,
  FaMapMarkedAlt,
  FaInfoCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleConfirmLogout = () => {
    setShowModal(false);
    navigate('/');
  };

  // Background image style
  const backgroundStyle = {
    backgroundImage: "url('/background2.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '2rem',
  };

  return (
    <div style={backgroundStyle}>
      <div className="container-fluid text-white">
        {/* Top Header */}
        <div className="text-center mb-4">
          <h2>WELCOME TO EduConnect</h2>
          <p className="text-success">
            Latest Application Status: <strong>Under Review</strong>
          </p>
        </div>

        {/* Notifications */}
        <div className="alert alert-info text-center" role="alert">
          <FaInfoCircle className="me-2" />
          Application submissions close on <strong>June 15, 2025!</strong>
        </div>

        {/* Profile and Activity Row */}
        <div className="row mb-4">
          {/* Profile Card */}
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm p-3">
              <h5>Student Profile</h5>
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> john@example.com</p>
              <p><strong>Student ID:</strong> 123456</p>
            </div>
          </div>

          {/* Main Actions */}
          <div className="col-md-4 mb-3 d-flex flex-column align-items-center justify-content-center">
            <div className="row w-100">
              <div className="col-12 mb-3">
                <Link to="/student/apply" className="text-decoration-none">
                  <div className="card p-4 shadow-lg text-center">
                    <FaLaptopCode size={100} className="mb-3" />
                    <h5 className="text-dark">APPLY FOR LAPTOP</h5>
                  </div>
                </Link>
              </div>
              <div className="col-12">
                <Link to="/student/track" className="text-decoration-none">
                  <div className="card p-4 shadow-lg text-center">
                    <FaMapMarkedAlt size={100} className="mb-3" />
                    <h5 className="text-dark">TRACK APPLICATION</h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm p-3">
              <h5>Recent Activity</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Applied for Laptop – May 5, 2025</li>
                <li className="list-group-item">Checked Application Status</li>
                <li className="list-group-item">Logged In</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Help and Logout */}
        <div className="d-flex justify-content-between align-items-center mt-4 px-3">
          <Link to="/student/help" className="btn btn-outline-info">
            <FaInfoCircle className="me-2" />
            Need Help?
          </Link>

          <button className="btn btn-danger" onClick={() => setShowModal(true)}>
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>

        {/* Logout Modal */}
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Logout</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to logout?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-danger" onClick={handleConfirmLogout}>Yes, Logout</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
