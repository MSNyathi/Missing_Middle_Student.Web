import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function ViewReports() {
    const reportData = [
        {
            label: "Total Laptops Donated",
            value: 120,
            badgeClass: "bg-primary"
        },
        {
            label: "Laptops Distributed to Students",
            value: 95,
            badgeClass: "bg-success"
        },
        {
            label: "Laptops Pending Distribution",
            value: 25,
            badgeClass: "bg-warning"
        },
        {
            label: "Donors Participating",
            value: 12,
            badgeClass: "bg-info"
        },
        {
            label: "Recent Donations (Last Month)",
            value: 15,
            badgeClass: "bg-secondary"
        }
    ];
    return (
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 overflow-hidden bg-light">
            {/* Top Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
                <div className="container-fluid d-flex justify-content-between align-items-center px-3">
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <img src={tut25} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                        <span className="fw-bold">EduConnect</span>
                    </Link>
                    <span className="navbar-text text-white h5 m-0">View Reports</span>
                </div>
            </nav>

            {/* Content Section */}
            <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center w-100 px-3">
                <p className="fw-bold fs-6 mb-4" style={{ color: 'black' }}>
                    Here you can view various reports related to the system.
                </p>

                <div style={{ maxWidth: '500px', width: '100%', boxShadow: '8px 4px 16px rgba(0, 0, 0, 0.58)', borderRadius: '12px', background: '#fff', padding: '2rem' }}>
                    <h4 className="mb-3 text-start" style={{ color: 'black' }}>Laptop Donation Reports</h4>
                    <ul className="list-group mb-4 text-start">
                        {reportData.map((report, idx) => (
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                {report.label}
                                <span className={`badge ${report.badgeClass} rounded-pill`}>{report.value}</span>
                            </li>
                        ))}
                    </ul>

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
        </div>
    );
}

export default ViewReports;
