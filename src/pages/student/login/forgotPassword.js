import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginNavbar from '../../components/LoginNavbar'; // adjust path as needed
import './studentLogin.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    const emailRegex = /^[0-9]{9}@tut4life\.ac\.za$/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid student email.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <>
      <LoginNavbar />
      <div className="login-container">
        <h2>Forgot Password</h2>
        {submitted ? (
          <div className="success">A reset link has been sent to your email.</div>
        ) : (
          <form onSubmit={handleReset}>
            <label>Student Email</label>
            <input
              type="email"
              value={email}
              placeholder="213493345@tut4life.ac.za"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <div className="error">{error}</div>}
            <button type="submit">Send Reset Link</button>
          </form>
        )}
        <p><Link to="/student/login">Back to Login</Link></p>
      </div>
    </>
  );
}

export default ForgotPassword;
