import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './studentLogin.css';
import LoginNavbar from '../../../commponents/loginNavbar';// adjust path as needed

function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[0-9]{9}@tut4life\.ac\.za$/;

    if (!emailRegex.test(email)) {
      setError('Enter a valid TUT student email.');
      return;
    }

    if (!password.trim()) {
      setError('Password is required.');
      return;
    }

    setError('');
    navigate('/student/dashboard'); // adjust based on your actual route
  };

  return (
    <>
    <LoginNavbar />
      <div className="login-container">
        <h2>Student Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="218493345@tut4life.ac.za"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p><Link to="/student/login/forgot-password">Forgot Password?</Link></p>
        <p>Don't have an account? <Link to="/student/register">Sign up</Link></p>
      </div>
    </>
  );
}

export default StudentLogin;
