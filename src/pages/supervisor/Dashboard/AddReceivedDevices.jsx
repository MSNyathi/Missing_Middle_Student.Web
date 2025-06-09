import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function AddReceivedDevices() {
    const [serialNumber, setSerialNumber] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [model, setModel] = React.useState('');
    const [showSuccess, setShowSuccess] = React.useState(false);

    // Load devices from localStorage on mount
    React.useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('devices') || '[]');
        setDevices(stored);
    }, []);

    const [devices, setDevices] = React.useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'serialNumber') setSerialNumber(value);
        if (name === 'brand') setBrand(value);
        if (name === 'model') setModel(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!serialNumber.trim() || !brand.trim() || !model.trim()) return;

        // Create new device object
        const newDevice = {
            id: `custom-${Date.now()}`,
            sn: serialNumber,
            name: brand,
            model: model
        };

        // Update state and localStorage
        const updatedDevices = [...devices, newDevice];
        setDevices(updatedDevices);
        localStorage.setItem('devices', JSON.stringify(updatedDevices));

        // Clear input fields and show success
        setSerialNumber('');
        setBrand('');
        setModel('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <div
            className="d-flex flex-column justify-content-start align-items-center vh-100 overflow-hidden"
            style={{ backgroundColor: '#f8f9fa' }}
        >
            {/* Top Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
                <div className="container-fluid d-flex justify-content-between align-items-center px-3">
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <img src={tut25} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                        <span className="fw-bold">EduConnect</span>
                    </Link>
                    <span className="navbar-text text-white h5 m-0">
                        Add Received Devices
                    </span>
                </div>
            </nav>

            {/* Content Area (Centered) */}
            <div
                className="d-flex flex-column justify-content-center align-items-center w-100"
                style={{
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    maxWidth: '500px',
                    marginTop: '150px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    boxShadow: '8px 4px 8px rgba(0, 0, 0, 0.56)',
                    minHeight: '250px',
                    padding: '24px 0'
                }}
            >
                <p className="fw-bold fs-6 text-center px-2" style={{ color: 'black' }}>
                    Please add the devices that have been received for donation or repair.
                </p>

                <form className="w-100 px-3" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            id="serialNumber"
                            name="serialNumber"
                            className="form-control"
                            placeholder="Enter serial number"
                            value={serialNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            className="form-control"
                            placeholder="Enter brand"
                            value={brand}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            id="model"
                            name="model"
                            className="form-control"
                            placeholder="Enter model"
                            value={model}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        Add Device
                    </button>
                </form>
            </div>
            {/* Back button fixed to bottom left */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    left: '24px',
                    zIndex: 1000
                }}
            >
                <Link
                    to="/supervisor/dashboard"
                    className="btn custom-back-btn"
                    style={{ backgroundColor: '#6c757d', color: '#fff', border: 'none' }}
                >
                    <i className="bi bi-arrow-left"></i> Back
                </Link>
            </div>
            {/* Success message after adding device */}
            {showSuccess && (
                <div
                    className="alert alert-success position-fixed"
                    style={{
                        bottom: '90px',
                        left: '24px',
                        zIndex: 1100,
                        minWidth: '220px'
                    }}
                    role="alert"
                >
                    Device added successfully!
                </div>
            )}
            <style>
                {`
                    .custom-back-btn {
                        background-color: #6c757d !important;
                        color: #fff !important;
                        border: none !important;
                        transition: background 0.2s;
                    }
                    .custom-back-btn:hover, .custom-back-btn:focus {
                        background-color: #0d6efd !important;
                        color: #fff !important;
                    }
                `}
            </style>
        </div>
    );
}

export default AddReceivedDevices;