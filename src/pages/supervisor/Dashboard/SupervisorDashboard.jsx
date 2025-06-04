import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function SupervisorDashboard() {
    return (
        <div className="d-flex flex-column vh-100" style={{ overflow: 'hidden' }}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4" style={{ borderRadius: 0 }}>
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={tut25} alt="Logo" height="40" className="me-2" />
                    <span className="fw-bold">EduConnect</span>
                </Link>
                <span className="navbar-text ms-auto h5 text-white">
                    Supervisor Dashboard
                </span>
            </nav>

            {/* Layout: Sidebar + Content */}
            <div className="d-flex flex-grow-1 overflow-hidden">
                {/* Sidebar */}
                <div
                    className="d-flex flex-column justify-content-between bg-primary text-white p-3"
                    style={{ width: '250px' }}
                >
                    <div>
                        <Link to="/" className="d-block mb-3 text-white fw-semibold text-decoration-none">
                            <i className="bi bi-house-door me-2"></i> Home
                        </Link>
                    </div>
                    <div>
                        <button
                            className="btn btn-danger w-100"
                            onClick={() => (window.location.href = "/")}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i> Logout
                        </button>
                    </div>
                </div>

                {/* Main Content - Centered and Scroll-Free */}
                <div className="flex-grow-1 bg-light d-flex align-items-center justify-content-center">
                    <div className="row g-4 justify-content-center w-75">
                        <div className="col-md-6">
                            <Link to="/supervisor/donation-requests" className="text-decoration-none">
                                <div className="card shadow-sm h-100 hover-card">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">Pending Donation Requests</h5>
                                        <p className="card-text">View and accept new laptop donation requests from donors.</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <Link to="/supervisor/add-received-devices" className="text-decoration-none">
                                <div className="card shadow-sm h-100 hover-card">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">Add Received Devices</h5>
                                        <p className="card-text">Capture serial numbers and add laptops to the database after receiving them.</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <Link to="/supervisor/send-devices-to-technician" className="text-decoration-none">
                                <div className="card shadow-sm h-100 hover-card">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">Send Devices to Technician</h5>
                                        <p className="card-text">Send a report of added devices to the technician for further processing.</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <Link to="/supervisor/view-reports" className="text-decoration-none">
                                <div className="card shadow-sm h-100 hover-card">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">Reports</h5>
                                        <p className="card-text">View or download reports of all processed donations and device transfers.</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupervisorDashboard;
