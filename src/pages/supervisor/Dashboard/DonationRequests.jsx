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
            <div id="landingsection2">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number of Devices</th>
                            <th>Pickup Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example static data, replace with dynamic data as needed */}
                        <tr>
                            <td>1</td>
                            <td>Jane Doe</td>
                            <td>jane.doe@email.com</td>
                            <td>5</td>
                            <td>2024-07-01</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>John Smith</td>
                            <td>john.smith@email.com</td>
                            <td>2</td>
                            <td>2024-07-05</td>
                        </tr>
                    </tbody>
                </table>
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