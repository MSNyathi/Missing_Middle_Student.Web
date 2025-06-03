import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function DonationRequests() {
    const donationRequests = [
        {
            id: 1,
            name: "Chantel Moeketsi",
            email: "220649857@tut4life.ac.za",
            devices: 2,
            pickupDate: "2025-06-10"
        },
        {
            id: 2,
            name: "Lethabo Letswalo",
            email: "220625915@tut4life.ac.za",
            devices: 1,
            pickupDate: "2025-07-05"
        },
        {
            id: 3,
            name: "Thabo Mokoena",
            email: "220688314@tut4life.ac.za",
            devices: 3,
            pickupDate: "2025-08-15"
        },
        {
            id: 4,
            name: "Nandi Nkosi",
            email: "215638998@tut4life.ac.za",
            devices: 1,
            pickupDate: "2025-09-20"
        },
        {
            id: 5,
            name: "Sipho Dlamini",
            email: "223645865@tut4life.ac.za",
            devices: 4,
            pickupDate: "2025-10-30"
        },
        {
            id: 6,
            name: "Zanele Khumalo",
            email: "247536598@tut4life.ac.za",
            devices: 2,
            pickupDate: "2025-11-25"
        }
    ];
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
                <div className="container-fluid d-flex justify-content-between align-items-center px-3">
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
                        <div className="container d-flex flex-column align-items-center mt-0">
                            {/* Intro Text */}
                <p className="fw-bold fs-5 text-center mb-4" style={{ color: 'black', margin: '40px' }}>
                    Here you can view and manage pending laptop donation requests.
                </p>

                {/* Donation Requests Table */}
                                                <div
                                                    className="table-responsive w-100"
                                                    style={{
                                                        maxWidth: '1200px',
                                                        borderRadius: '8px',
                                                        boxShadow: '8px 4px 16px rgba(0, 0, 0, 0.53), 0 1.5px 4px rgba(0,0,0,0.08)'
                                                    }}
                                                >
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
                                                            {donationRequests.map((request, idx) => (
                                                                <tr key={request.id}>
                                                                    <td>{idx + 1}</td>
                                                                    <td>{request.name}</td>
                                                                    <td>{request.email}</td>
                                                                    <td>{request.devices}</td>
                                                                    <td>{request.pickupDate}</td>
                                                                    <td>
                                                                        <button style={{ marginRight: '15px' }}>Accept</button>
                                                                        <button className="reject-btn">Reject</button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="w-100 d-flex justify-content-start mt-4" style={{ maxWidth: '1200px' }}>
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
                                                        .reject-btn {
                                                            background-color: #f8f9fa;
                                                            color: #dc3545;
                                                            border: 1px solid #dc3545;
                                                            transition: background 0.2s, color 0.2s;
                                                            padding: 6px 16px;
                                                            border-radius: 4px;
                                                            font-weight: 500;
                                                        }
                                                        .reject-btn:hover, .reject-btn:focus {
                                                            background-color: #dc3545 !important;
                                                            color: #fff !important;
                                                            border-color: #dc3545 !important;
                                                        }
                                                    `}
                                                </style>
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
