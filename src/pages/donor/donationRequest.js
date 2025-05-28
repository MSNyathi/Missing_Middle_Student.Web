import React, { useState } from "react";
import DonorNavbar from "./donorNavbar";
import './DonationRequest.css';
import 'react-toastify/dist/ReactToastify.css';

export default function DonationRequest() {
    const [showModal, setShowModal] = useState(false);
    const getTomorrowDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0]; // 'YYYY-MM-DD'
};
    const [formData, setFormData] = useState({
        devNum: '',
        notes: '',
        pickUpDate: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleConfirmSubmit = () => {
        console.log('Submitted:', formData);

        setFormData({
            devNum: '',
            pickUpDate: '',
            notes: '',
        });

        setShowModal(false);
    };

    const handleOpenModal = (e) => {
        e.preventDefault(); // prevent premature submission
        setShowModal(true);
    };

    return (
        <div className="request-container">
            <DonorNavbar />

            <main className="main-contents">
                <div className="main-heading">
                    <h1><b>DONATION REQUEST</b></h1>
                </div>

                <div className="request-form">
                    <form className="donation-form" onSubmit={handleOpenModal}>
                        <label htmlFor="NumberOfDevices">Number of Devices: </label>
                        <input
                            type="number"
                            name="devNum"
                            required
                            value={formData.devNum}
                            onChange={handleChange}
                        />

                        <label htmlFor="pickUpDate">Pickup Date:</label>
                        <input
                            type="date"
                            name="pickUpDate"
                            value={formData.pickUpDate}
                            min={getTomorrowDate()}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="notes">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            rows={4}
                            cols={50}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">Submit Request</button>
                    </form>

                    {showModal && (
                        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Confirm Request</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Are you sure you want to log a request?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                        <button className="btn btn-danger" onClick={handleConfirmSubmit}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
