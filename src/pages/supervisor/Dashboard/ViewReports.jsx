import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function ViewReports() {
    return (
        <>
            <div className="App">
                <nav id="mynavv">
                    <Link to="/">
                        <img id="myimg" src={tut25} className="bcolor" alt="Logo" />
                    </Link>
                    <h1 id="myh1">View Reports</h1>
                    <h1 id="myh1">EduConnect</h1>
                </nav>
            </div>
            <div id="landingsection2">
                
                <p id="p1">Here you can view various reports related to the system.</p>
            </div>
        <div style={{ margin: '30px 0 0 20px' }}>
            <h2>Laptop Donation Reports</h2>
            <ul className="list-group" style={{ maxWidth: '500px' }}>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total Laptops Donated
                    <span className="badge bg-primary rounded-pill">120</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Laptops Distributed to Students
                    <span className="badge bg-success rounded-pill">95</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Laptops Pending Distribution
                    <span className="badge bg-warning rounded-pill">25</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Schools Participating
                    <span className="badge bg-info rounded-pill">8</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Recent Donations (Last Month)
                    <span className="badge bg-secondary rounded-pill">15</span>
                </li>
            </ul>
        </div>
        <div style={{ margin: '20px 0 0 20px' }}>
                        <Link to="/supervisor/dashboard" className="btn btn-secondary">
                            <i className="bi bi-arrow-left"></i> Back
                        </Link>
                    </div>
        </>
    );
}
export default ViewReports;