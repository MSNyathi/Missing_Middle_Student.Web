import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DonorNavbar.css';
import {FaSignOutAlt} from 'react-icons/fa';

const DonorNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    setShowModal(false);
    navigate('/');
  };

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
          <button className="nav-link text-white" onClick={() => setShowModal(true)}><FaSignOutAlt className="me-2" /> Logout</button>
        </li>
      </ul>
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
    
  );
};

export default DonorNavbar;
