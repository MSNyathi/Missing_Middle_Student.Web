import React, { useState } from 'react';
import AdminNavbar from '../../../commponents/adminNavbar';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace this with your backend submission logic
    console.log('Technician registered:', formData);
  };

  return (
    <div className="d-flex">
      <AdminNavbar />
      <div className="container-fluid p-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <h3 className="card-title text-center mb-4">🛠️ Register Technician</h3>
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Staff Number</label>
                    <input
                      type="text"
                      name="staffNum"
                      value={formData.staffNum}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Surname</label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Initials</label>
                    <input
                      type="text"
                      name="initials"
                      value={formData.initials}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="technician">Technician</option>
                    </select>
                  </div>
                  <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary w-100">
                      Register Technician
                    </button>
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
