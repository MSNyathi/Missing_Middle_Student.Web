import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function DonationRequests() {
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <img src={tut25} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                        <span className="fw-bold">EduConnect</span>
                    </Link>
                    <span className="navbar-text text-white h5 m-0">
                        Pending Donation Requests
                    </span>
                </div>
            </nav>

            {/* Page Content */}
            <div className="container d-flex flex-column align-items-center mt-5">
                {/* Intro Text */}
                <p className="fw-bold fs-5 text-center mb-4" style={{ color: 'black' }}>
                    Here you can view and manage pending laptop donation requests.
                </p>

                {/* Table */}
                <div className="table-responsive w-100" style={{ maxWidth: '800px' }}>
                    <table className="table table-striped table-hover align-middle text-center">
                        <thead className="table-primary">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number of Devices</th>
                                <th>Pickup Date</th>
                                <th>Accept Requests</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Jane Doe</td>
                                <td>jane.doe@email.com</td>
                                <td>5</td>
                                <td>2024-07-01</td>
                                <td><button>Accept</button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>John Smith</td>
                                <td>john.smith@email.com</td>
                                <td>2</td>
                                <td>2024-07-05</td>
                                <td><button>Accept</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Back Button aligned left */}
                <div className="w-100 d-flex justify-content-start mt-4" style={{ maxWidth: '800px' }}>
                    <Link
                        to="/supervisor/dashboard"
                        className="btn custom-back-btn"
                        style={{ backgroundColor: '#6c757d', color: '#fff', border: 'none' }}
                    >
                        <i className="bi bi-arrow-left"></i> Back
                    </Link>
                </div>
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
        </>
    );
}

export default DonationRequests;
