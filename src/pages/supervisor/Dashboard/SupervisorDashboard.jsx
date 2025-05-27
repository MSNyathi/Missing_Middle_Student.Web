import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../Login/Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function SupervisorDashboard() {
    return (
        <>
            <div className="App">
                <nav id="mynav">
                    <Link to="/">
                        <img id="myimg" src={tut25} className="bcolor" />
                    </Link>
                    <h2 id="myh1">Supervisor Dashboard</h2>
                    <h1 id="myh1">EduConnect</h1>
                    
                </nav>
            </div>
            <div id="mydiv" style={{ margin: "40px auto", maxWidth: 900 }}>
                
                <div className="dashboard-section">
                    <h3 id="myh1">Pending Donation Requests</h3>
                    <p id="p3">View and accept new laptop donation requests from donors.</p>
                    {/* TODO: List of pending requests */}
                </div>
                <div className="dashboard-section">
                    <h3 id="myh1">Add Received Devices</h3>
                    <p id="p3">Capture serial numbers and add laptops to the database after receiving them.</p>
                    {/* TODO: Form to add serial numbers */}
                </div>
                <div className="dashboard-section">
                    <h3 id="myh1">Send Devices to Technician</h3>
                    <p id="p3">Send a report of added devices to the technician for further processing.</p>
                    {/* TODO: Button to send report */}
                </div>
                <div className="dashboard-section">
                    <h3 id="myh1">Reports</h3>
                    <p id="p3">View or download reports of all processed donations and device transfers.</p>
                    {/* TODO: List/download links */}
                </div>
            </div>
        </>
    );
}

export default SupervisorDashboard;