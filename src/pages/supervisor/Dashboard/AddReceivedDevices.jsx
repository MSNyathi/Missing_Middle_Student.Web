import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../Login/Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function AddReceivedDevices() {
    return (
        <>
            <div className="App">
                <nav id="mynav">
                    <Link to="/">
                        <img id="myimg" src={tut25} className="bcolor" alt="Logo" />
                    </Link>
                    <h1 id="myh1">EduConnect</h1>
                </nav>
            </div>
            <div id="mydiv">
                <h1 id="myh1">Add Received Devices</h1>
                <p id="p1">Here you can add devices that have been received for donation or repair.</p>
            </div>
        </>
    );
}
export default AddReceivedDevices;