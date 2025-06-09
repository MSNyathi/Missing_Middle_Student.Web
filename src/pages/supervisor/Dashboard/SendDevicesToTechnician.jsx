import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function SendDevicesToTechnician() {
    // Hardcoded default devices
    const defaultDevices = [
        { id: 'device1', sn:'123', name: 'Huawei', model: 'MateBook D15' },
        { id: 'device2', sn:'456', name: 'Apple', model: 'iPad Pro' },
        { id: 'device3', sn:'789', name: 'Dell', model: 'Inspiron 15' },
        { id: 'device4', sn:'101', name: 'Samsung', model: 'Galaxy Tab S7' },
        { id: 'device5', sn:'234', name: 'Lenovo', model: 'ThinkPad X1' },
        { id: 'device6', sn:'567', name: 'HP', model: 'Pavilion 15' }
    ];

    // Load devices from localStorage and merge with default devices
    const [devices, setDevices] = React.useState(() => {
        const stored = JSON.parse(localStorage.getItem('devices') || '[]');
        return [
            ...defaultDevices,
            ...stored.filter(
                d => !defaultDevices.some(def => def.id === d.id)
            )
        ];
    });

    // State to keep track of selected devices (all selected by default)
    const [selectedDevices, setSelectedDevices] = React.useState(
        devices.map(d => d.id)
    );

    // If devices in localStorage change, update state
    React.useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('devices') || '[]');
        setDevices([
            ...defaultDevices,
            ...stored.filter(
                d => !defaultDevices.some(def => def.id === d.id)
            )
        ]);
    }, []);

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setSelectedDevices(prev =>
            checked
                ? [...prev, id]
                : prev.filter(deviceId => deviceId !== id)
        );
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
                        Send Devices to Technician
                    </span>
                </div>
            </nav>

            {/* Content Area */}
            <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center w-100 text-center px-3 position-relative">
                <p className="fw-bold fs-6 mb-4" style={{ color: 'black' }}>
                    Here you can send devices to the technician for repair or maintenance.
                </p>

                <form
                    className="w-100"
                    style={{
                        maxWidth: '400px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.66)',
                        borderRadius: '12px',
                        background: '#fff',
                        padding: '2rem'
                    }}
                >
                    <h5 className="mb-3">Select Devices</h5>
                    {devices.map((device) => (
                        <div className="form-check text-start mb-2" key={device.id}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={device.id}
                                name={device.id}
                                checked={selectedDevices.includes(device.id)}
                                onChange={handleCheckboxChange}
                                style={{ color: 'black' }}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={device.id}
                                style={{ color: 'black' }}
                            >
                                {device.name} - {device.model}
                            </label>
                        </div>
                    ))}

                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Send Selected Devices
                    </button>
                </form>
            </div>
            {/* Back button absolutely positioned at bottom left of the viewport */}
            <Link
                to="/supervisor/dashboard"
                className="btn custom-back-btn position-fixed"
                style={{
                    left: '24px',
                    bottom: '24px',
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    zIndex: 1050
                }}
            >
                <i className="bi bi-arrow-left"></i> Back
            </Link>
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

export default SendDevicesToTechnician;