import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../Login/Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function ViewReports() {
    return (
        <>
            <div className="App">
                <nav id="mynav">
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
        <div className="container mt-4">
            <h2>Available Reports</h2>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Student Progress Report
                    <Link to="/supervisor/reports/student-progress" className="btn btn-primary btn-sm">
                        View
                    </Link>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Attendance Summary
                    <Link to="/supervisor/reports/attendance-summary" className="btn btn-primary btn-sm">
                        View
                    </Link>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Assignment Submission Report
                    <Link to="/supervisor/reports/assignment-submissions" className="btn btn-primary btn-sm">
                        View
                    </Link>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Feedback & Evaluation
                    <Link to="/supervisor/reports/feedback-evaluation" className="btn btn-primary btn-sm">
                        View
                    </Link>
                </li>
            </ul>
        </div>
        </>
    );
}
export default ViewReports;