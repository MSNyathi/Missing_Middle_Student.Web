import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function DonationRequests() {
    return (
        <>
            <div className="App">
                <nav id="mynavv">
                    <Link to="/">
                        <img id="myimg" src={tut25} className="bcolor" alt="Logo" />
                    </Link>
                    <h1 id="myh1">Pending Donation Requests</h1>
                    <h1 id="myh1">EduConnect</h1>
                </nav>
            </div>
            <div id="landingsection2">
                
                <p id="p1">Here you can view and manage pending laptop donation requests.</p>
            </div>
        <div className="container mt-4">
            <h2>Messages from Donors</h2>
            <ul className="list-group">
                <li className="list-group-item">
                    <strong>John Doe:</strong> I would like to donate a laptop. Please let me know the next steps.
                </li>
                <li className="list-group-item">
                    <strong>Jane Smith:</strong> I have a gently used laptop available for donation.
                </li>
                <li className="list-group-item">
                    <strong>Michael Brown:</strong> Can I schedule a pickup for my laptop donation?
                </li>
            </ul>
        </div>
        <div style={{ margin: '20px 0 0 20px' }}>
                        <Link to="/supervisor/dashboard" className="btn btn-secondary">
                            <i className="bi bi-arrow-left"></i> Back
                        </Link>
                    </div>
        </>
    )
}
export default DonationRequests;