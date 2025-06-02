import React, { useState } from 'react';
import axios from 'axios';

export default function ResetPassword() {
  const [step, setStep] = useState('email'); // email → otp → reset → done
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const apiBase = 'https://localhost:7102/api/'; // Replace if needed

  const clearMessages = () => {
    setError('');
    setSuccessMsg('');
  };

  const handleSendOtp = async () => {
    clearMessages();
    setLoading(true);
    try {
      await axios.post(`${apiBase}account/send-otp`, { email });
      setStep('otp');
      setSuccessMsg('OTP has been sent to your email.');
    } catch (err) {
      setError('Failed to send OTP. Please ensure the email is registered.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    clearMessages();
    setLoading(true);
    try {
      await axios.post(`${apiBase}account/verify-otp`, { email, otp });
      setStep('reset');
      setSuccessMsg('OTP verified successfully. Enter your new password.');
    } catch (err) {
      setError('Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    clearMessages();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${apiBase}account/reset-password`, { email, newPassword: password });
      setStep('done');
      setSuccessMsg('Your password has been reset.');
    } catch (err) {
      setError('Failed to reset password. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Reset Your Password</h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}
        {successMsg && <div className="alert alert-success text-center">{successMsg}</div>}

        {step === 'email' && (
          <>
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="btn btn-primary w-100"
              onClick={handleSendOtp}
              disabled={loading || !email}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <label className="form-label">Email address</label>
            <input type="email" className="form-control mb-3" value={email} readOnly />
            <label className="form-label">Enter OTP</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter the code sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="btn btn-warning w-100"
              onClick={handleVerifyOtp}
              disabled={loading || !otp}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}

        {step === 'reset' && (
          <>
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="btn btn-success w-100"
              onClick={handleResetPassword}
              disabled={loading || !password || !confirmPassword}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}

        {step === 'done' && (
          <div className="text-center">
            <h5 className="text-success mb-3">Password reset successfully!</h5>
            <a href="/admin/login" className="btn btn-primary">Return to Login</a>
          </div>
        )}
      </div>
    </div>
  );
}
