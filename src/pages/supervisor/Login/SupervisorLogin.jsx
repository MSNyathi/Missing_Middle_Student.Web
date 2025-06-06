import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../../admin/login/adminLogin.css';
import backgroundImage from '../../../assets/backgroundAdmin.jpeg';

function SupervisorLogin() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!username.trim()) newErrors.username = 'Username is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        if (username !== '220625915') newErrors.username = 'Invalid username';
        if (password !== '123123') newErrors.password = 'Invalid password';
        if (Object.keys(newErrors).length === 0) {
            // Redirect to dashboard
            window.location.href = '/supervisor/dashboard';
        }
    };

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

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3 text-start">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                id="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="mb-4 text-start">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary w-100">LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SupervisorLogin;
