import React from 'react';
import { useNavigate } from 'react-router-dom';
import './student.css';

function SuccessPage() {

    const navigate = useNavigate();

    return (
        <div className="success_container">
            <div className="success-modal">
                <h2 className="success-title">SUCCESS!!</h2>
                <p className="success-subtitle">Registration Complete</p>
                <button className="success-button" onClick={() => navigate('/login')}>
                    DONE
                </button>
            </div>
        </div>
    );

}
export default SuccessPage;