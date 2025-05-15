import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../dashboard/index.css';
import tutLogo from '../../../assets/tut.png';
import backgroundImage from '../../../assets/background2.jpeg';

const applicationSteps = [
  'Application Submitted',
  'Document Upload Pending',
  'Documents Under Review',
  'Document Verification',
  'Awaiting Correction (if needed)',
  'Documents Verified',
  'Validation in Progress',
  'Academic Review',
  'Financial Review',
  'Under Evaluation',
  'Recommendation Made',
  'Awaiting Final Approval',
  'Approved',
  'Rejected'
];

const TrackApplication = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const applicationStatus = 'Academic Review';
  const currentStep = applicationSteps.indexOf(applicationStatus) + 1;

  const handleLogout = () => {
    setShowModal(false);
    navigate('/');
  };

  const renderStep = (label, index) => {
    const stepNum = index + 1;
    const isActive = stepNum === currentStep;
    const isCompleted = stepNum < currentStep;
    const isRejected = label === 'Rejected' && isActive;

    let circleClass = 'bg-light border';
    if (isRejected) circleClass = 'bg-danger text-white';
    else if (isActive) circleClass = 'bg-primary text-white';
    else if (isCompleted) circleClass = 'bg-success text-white';

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="text-center d-flex flex-column align-items-center"
        style={{ minWidth: '120px', maxWidth: '160px' }}
      >
        <div
          className={`rounded-circle mb-2 d-flex align-items-center justify-content-center ${circleClass}`}
          style={{ width: '45px', height: '45px' }}
        >
          {stepNum}
        </div>
        <div className={`small fw-semibold ${darkMode ? 'text-white' : 'text-dark'}`}>
          {label}
        </div>
      </motion.div>
    );
  };

  const glassClass = darkMode ? 'glass-card-dark text-white' : 'glass-card-light text-dark';

  return (
    <div
      className="position-relative d-flex flex-column justify-content-start align-items-center min-vh-100 p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: darkMode ? '#fff' : '#000',
      }}
    >
      {/* Logo */}
      <img
        src={tutLogo}
        alt="TUT Logo"
        className="position-absolute"
        style={{ top: '20px', left: '20px', height: '60px' }}
      />

      {/* Theme Toggle with Icon */}
      <div className="d-flex justify-content-end w-100 mb-3 pe-5 align-items-center gap-2">
        <div className="form-check form-switch d-flex align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            id="themeSwitch"
          />
          <label htmlFor="themeSwitch" className="ms-2" style={{ cursor: 'pointer' }}>
            {darkMode ? (
              <FaMoon size={20} className="text-white" title="Switch to Light Mode" />
            ) : (
              <FaSun size={20} className="text-warning" title="Switch to Dark Mode" />
            )}
          </label>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="position-fixed bottom-0 start-0 p-3">
        <Link to="/student" className="btn btn-outline-secondary">
          <FaArrowLeft className="me-2" />
          Back to Dashboard
        </Link>
      </div>

      <div className="position-fixed bottom-0 end-0 p-3">
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

      {/* Application Progress Tracker */}
      <div
        className={`container-fluid rounded shadow p-4 ${glassClass}`}
        style={{
          maxWidth: '90vw',
          marginTop: '120px',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <h2 className="mb-3 text-center">Track Your Application</h2>
        <p className="text-center mb-4">Monitor the status of your laptop application below:</p>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {applicationSteps.map(renderStep)}
        </div>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className={`modal-content ${glassClass}`}>
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleLogout}>Yes, Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackApplication;
