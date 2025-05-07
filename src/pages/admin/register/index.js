import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../../commponents/adminNavbar';
import { Image } from 'react-bootstrap';

const RegisterTechnician = () => {
  const [formData, setFormData] = useState({
    staffNum: '',
    surname: '',
    initials: '',
    email: '',
    contact: '',
    password: '',
    role: 'technician',
  });

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Modal and validation state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [actionType, setActionType] = useState(''); // 'approve' or 'reject'
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Technician registered:', formData);
  };

  const handleConfirmAction = () => {
    if (!adminPassword) {
      setPasswordError('Password is required.');
      return;
    }

    const correctPassword = 'admin123'; // simulate actual auth

    if (adminPassword !== correctPassword) {
      setPasswordError('Incorrect password.');
      return;
    }

    setShowPasswordModal(false);
    setAdminPassword('');
    setPasswordError('');

    if (actionType === 'approve') {
      console.log('Application approved.');
    } else if (actionType === 'reject') {
      console.log('Application rejected.');
    }
  };

  return (
    <div className="d-flex">
      <AdminNavbar />
      <div className="flex-grow-1 p-4">
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Add Technician</h2>
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">{currentTime}</span>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              roundedCircle
              alt="Profile"
              width={32}
              height={32}
            />
          </div>
        </div>

        {/* Registration Form */}
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="container" style={{ maxWidth: '700px' }}>
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <h3 className="card-title text-center mb-4">🛠️ Register Technician</h3>
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Staff Number</label>
                    <input type="text" name="staffNum" value={formData.staffNum} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Surname</label>
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Initials</label>
                    <input type="text" name="initials" value={formData.initials} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact</label>
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="form-select" required>
                      <option value="technician">Technician</option>
                    </select>
                  </div>
                  <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary w-100">Register Technician</button>
                  </div>
                </form>


              </div>
            </div>
            <p className="text-muted text-center mt-3">Only technician roles are currently supported.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterTechnician;
