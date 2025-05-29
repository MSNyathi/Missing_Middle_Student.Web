import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function SendDevicesToTechnician() {
    return (
        <>
            <div className="App">
                <nav id="mynavv">
                    <Link to="/">
                        <img id="myimg" src={tut25} className="bcolor" alt="Logo" />
                    </Link>
                    <h1 id="myh1">Send Devices to Technician</h1>
                    <h1 id="myh1">EduConnect</h1>
                </nav>
            </div>
            <div id="landingsection2">
                
                <p id="p1">Here you can send devices to the technician for repair or maintenance.</p>
            </div>
            <div className="device-selection-container">
                <h2>Select Devices</h2>
                <form>
                    <div className="device-list">
                        <label>
                            <input type="checkbox" name="device1" />
                            Device 1 - Chromebook
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="device2" />
                            Device 2 - iPad
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="device3" />
                            Device 3 - Windows Laptop
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="device4" />
                            Device 4 - Android Tablet
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }}>
                        Send Selected Devices
                    </button>

                </form>
            </div>
            <div style={{ margin: '20px 0 0 20px' }}>
                            <Link to="/supervisor/dashboard" className="btn btn-secondary">
                                <i className="bi bi-arrow-left"></i> Back
                            </Link>
                        </div>
        </>
    );
}
export default SendDevicesToTechnician;