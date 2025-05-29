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
                    <h1 id="myh1">Add Received Devices</h1>
                    <h1 id="myh1">EduConnect</h1>
                </nav>
            </div>
            <div id="landingsection2">
                
                <p id="p1">Here you can add devices that have been received for donation or repair.</p>
            </div>
            <div className="device-form-container">
                <form className="device-form">
                    <div className="form-group">
                        <label htmlFor="serialNumber">Serial Number</label>
                        <input
                            type="text"
                            id="serialNumber"
                            name="serialNumber"
                            className="form-control"
                            placeholder="Enter serial number"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            className="form-control"
                            placeholder="Enter brand"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        Add Device
                    </button>
                </form>
            </div>
        </>
    );
}
export default AddReceivedDevices;