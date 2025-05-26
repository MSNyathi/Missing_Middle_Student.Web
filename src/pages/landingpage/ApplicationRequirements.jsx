import React from 'react';
import tut25 from '../../assets/logo2.png';
import '../../Login/Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function ApplicationRequirements() {
    return (
        <>
            <div className="App">
                <nav id="mynav">
                    <Link to="/">
                        <img id="myimg" src={tut25} className="bcolor" alt="Logo" />
                    </Link>
                    <h1 id="myh1">EduConnect</h1>
                    <Link to="/login" id="mylink">
                        <button id="btn"><i id="i" className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>SIGN IN</button>
                    </Link>
                </nav>
            </div>
            <div id="mydiv">
                <h1 id="myh1">Application Requirements</h1>
                <p id="p1">To apply for a refurbished laptop, please ensure you meet the following requirements:</p>
                <ul id="requirements-list">
                    <li>Must be a registered student at Tshwane University of Technology.</li>
                    <li>Demonstrated financial need.</li>
                    <li>Commitment to using the laptop for academic purposes.</li>
                </ul>
                <p id="p1">If you meet these requirements, please proceed to the application form.</p>
            </div>
            <Link to="/">
                <button id="btn">Back</button>
            </Link>
        </>
    );
}
export default ApplicationRequirements;