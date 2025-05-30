import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function SupervisorDashboard() {
    return (
        <>
            <div className="App">
                <nav id="mynavv">
                    <Link to="/">
                        <img id="myimg" src={tut25} className="bcolor" />
                    </Link>
                    <h2 id="myh1">Supervisor Dashboard</h2>
                    <h1 id="myh1">EduConnect</h1>
                    
                </nav>
                <div id="supervisorsidebar">
                    <Link to="/" id="p1">
                        <i className="bi bi-house-door" style={{ marginRight: "8px" }}></i>
                        Home
                    </Link>
                    <button id="btn"
                        onClick={() => {
                            // Add your logout logic here
                            window.location.href = "/";
                        }}
                        style={{
                            background: "#e74c3c",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "10px 20px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "16px"
                        }}
                    >
                        <i className="bi bi-box-arrow-right" style={{ marginRight: "8px" }}></i>
                        Logout
                    </button>
                </div>
            </div>
            <div id="supervisordashcards">
                <Link to="/supervisor/donation-requests" id="mylink">
                <div id="dashboard-section" className="dashboard-section">
                    <h3 id="myh1">Pending Donation Requests</h3>
                    <p id="p3">View and accept new laptop donation requests from donors.</p>
                    {/* TODO: List of pending requests */}
                </div>
                </Link>
                <Link to="/supervisor/add-received-devices" id="mylink">
                <div id="dashboard-section" className="dashboard-section">
                    <h3 id="myh1">Add Received Devices</h3>
                    <p id="p3">Capture serial numbers and add laptops to the database after receiving them.</p>
                    {/* TODO: Form to add serial numbers */}
                </div>
                </Link>
            </div>
            <div id="supervisordashcards">
                <Link to="/supervisor/send-devices-to-technician" id="mylink">
                <div id="dashboard-section" className="dashboard-section">
                    <h3 id="myh1">Send Devices to Technician</h3>
                    <p id="p3">Send a report of added devices to the technician for further processing.</p>
                    {/* TODO: Button to send report */}
                </div>
                </Link>
                <Link to="/supervisor/view-reports" id="mylink">
                <div id="dashboard-section" className="dashboard-section">
                    <h3 id="myh1">Reports</h3>
                    <p id="p3">View or download reports of all processed donations and device transfers.</p>
                    {/* TODO: List/download links */}
                </div>
                </Link>
            </div>
            
        </>
    );
}

export default SupervisorDashboard;