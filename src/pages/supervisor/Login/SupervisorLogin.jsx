import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../../admin/login/adminLogin.css';
import backgroundImage from '../../../assets/backgroundAdmin.jpeg';
import './supervisor.css'

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
            window.location.href = '/supervisor/dashboard';            if (Object.keys(newErrors).length === 0) {
                // Set a token in localStorage
                localStorage.setItem('authToken', 'supervisor-demo-token');
                // Redirect to dashboard
                window.location.href = '/supervisor/dashboard';
            }            localStorage.setItem('authToken', 'supervisor-demo-token');            
        }
    };

   return (
  <div className="donor-container">
    {/* Left Panel */}
    <div className="donor-left">
      <div className="donor-navbar">
        <Link to="/" className="logo-link">
          <img src={tut25} alt="TUT Logo" className="tut-logo" />
          </Link>
          <h1 className="brand-title">EduConnect</h1>
        
      </div>
      <div className="left-text d-flex flex-column justify-content-center align-items-center text-center h-100">
        <h2>
          EduConnect a multi-user platform, to manage and streamline the donation, refurbishment, and allocation of laptops.
        </h2>
        <p>
          To financially vulnerable students at Tshwane University of Technology.
        </p>
      </div>
    </div>

    {/* Right Panel */}
    <div className="donor-right">
      <div className="login-box">
        <h2>Welcome, Supervisor</h2>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Username"
            className={`form-control mb-3 ${errors.username ? 'is-invalid' : ''}`}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          {errors.username && <div className="invalid-feedback d-block">{errors.username}</div>}

          <input
            type="password"
            placeholder="Password"
            className={`form-control mb-3 ${errors.password ? 'is-invalid' : ''}`}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}

          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>
        <div className="login-options mt-3">
          <Link to="/admin/forgot-password" className="forgot">Forgot password?</Link>
        </div>
      </div>
    </div>
  </div>
);

}

export default SupervisorLogin;
