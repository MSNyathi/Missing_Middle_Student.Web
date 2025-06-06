import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../../admin/login/adminLogin.css';
import backgroundImage from '../../../assets/backgroundAdmin.jpeg';

function SupervisorLogin() {
    return (
        <>
            <nav className="d-flex justify-content-between align-items-center w-100 px-4 py-3" id="mynavv" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Link to="/" className="d-flex align-items-center text-white text-decoration-none">
                    <img src={tut25} alt="EduConnect Logo" height="40" className="me-2" />
                    <h1 className="h4 mb-0">EduConnect</h1>
                </Link>
            </nav>

            <div
                className="glass-bg d-flex flex-column align-items-center justify-content-center min-vh-100 text-white"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    paddingTop: '80px'
                }}
            >
                <div className="glass-card p-4 rounded shadow text-center" style={{ maxWidth: '400px', width: '100%' }}>
                    <i className="bi bi-person-circle mb-3" style={{ fontSize: '4rem' }}></i>
                    <h2 id="myh1" className="mb-2">Welcome, Supervisor</h2>
                    <p className="mb-4">Please enter your login details below.</p>

                    <form>
                        <div className="mb-3 text-start">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" required />
                        </div>
                        <div className="mb-4 text-start">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" required />
                        </div>
                        <div className="d-grid">
                            <Link to="/supervisor/dashboard">
                                <button type="button" className="btn btn-primary w-100">LOGIN</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SupervisorLogin;
