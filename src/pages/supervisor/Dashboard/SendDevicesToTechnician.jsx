import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function SendDevicesToTechnician() {
    return (
        <div
            className="d-flex flex-column justify-content-start align-items-center vh-100 overflow-hidden"
            style={{ backgroundColor: '#f8f9fa' }} // optional light background
        >
            {/* Top Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
                <div className="container-fluid d-flex justify-content-between align-items-center px-3">
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <img src={tut25} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                        <span className="fw-bold">EduConnect</span>
                    </Link>
                    <span className="navbar-text text-white h5 m-0">
                        Send Devices to Technician
                    </span>
                </div>
            </nav>

            {/* Content Area */}
            <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center w-100 text-center px-3">
                <p className="fw-bold fs-6 mb-4" style={{ color: 'black' }}>
                    Here you can send devices to the technician for repair or maintenance.
                </p>

                <form className="w-100" style={{ maxWidth: '400px' }}>
                    <h5 className="mb-3">Select Devices</h5>

                    <div className="form-check text-start mb-2">
                        <input className="form-check-input" type="checkbox" id="device1" name="device1" style={{ color: 'black' }} />
                        <label className="form-check-label" htmlFor="device1" style={{ color: 'black' }}>Device 1 - Chromebook</label>
                    </div>
                    <div className="form-check text-start mb-2">
                        <input className="form-check-input" type="checkbox" id="device2" name="device2" style={{ color: 'black' }} />
                        <label className="form-check-label" htmlFor="device2" style={{ color: 'black' }}>Device 2 - iPad</label>
                    </div>
                    <div className="form-check text-start mb-2">
                        <input className="form-check-input" type="checkbox" id="device3" name="device3" style={{ color: 'black' }} />
                        <label className="form-check-label" htmlFor="device3" style={{ color: 'black' }}>Device 3 - Windows Laptop</label>
                    </div>
                    <div className="form-check text-start mb-3">
                        <input className="form-check-input" type="checkbox" id="device4" name="device4" style={{ color: 'black' }} />
                        <label className="form-check-label" htmlFor="device4" style={{ color: 'black' }}>Device 4 - Android Tablet</label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Send Selected Devices
                    </button>
                </form>

                <Link
                                        to="/supervisor/dashboard"
                                        className="btn custom-back-btn"
                                        style={{ backgroundColor: '#6c757d', color: '#fff', border: 'none' }}
                                    >
                                        <i className="bi bi-arrow-left"></i> Back
                                    </Link>
            </div>
            {/* Custom styles for the back button */}
            <style>
                {`
                    .custom-back-btn {
                        background-color: #6c757d !important;
                        color: #fff !important;
                        border: none !important;
                        transition: background 0.2s;
                    }
                    .custom-back-btn:hover, .custom-back-btn:focus {
                        background-color: #0d6efd !important;
                        color: #fff !important;
                    }
                `}
            </style>
        </div>
    );
}

export default SendDevicesToTechnician;
