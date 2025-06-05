import React from 'react';
import tut25 from '../../../../assets/logo2.png';
import '../../../../landingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function SupervisorNotifications() {
  return (
    <>
      <div className="d-flex flex-column vh-100" style={{ overflow: 'hidden' }}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4" style={{ borderRadius: 0 }}>
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={tut25} alt="Logo" height="40" className="me-2" />
                    <span className="fw-bold">EduConnect</span>
                </Link>
                <span className="navbar-text ms-auto h5 text-white">
                    Notifications
                </span>
            </nav>

            <div className="d-flex flex-grow-1 overflow-hidden">
              <div className="d-flex flex-column justify-content-between bg-primary text-white p-3"
                                  style={{ width: '174px' }}
                              >
                                  <div>
                                      <Link to="/Supervisor/Dashboard" className="d-block mb-3 text-white fw-semibold text-decoration-none">
                                          <i className="bi bi-house-door me-2"></i> Home
                                      </Link>
                                      <Link to="/Supervisor/notifications" className="d-block mb-3 text-white fw-semibold text-decoration-none">
                                          <i className="bi bi-bell me-2"></i> Notifications
                                      </Link>
                                      
                                  </div>
                                  <div>
              
                                      <button
                                          className="btn btn-danger w-100"
                                          onClick={() => (window.location.href = "/")}
                                      >
                                          <i className="bi bi-box-arrow-right me-2"></i> Logout
                                      </button>
                                  </div>
              </div>
              <div className="flex-grow-1 p-4 d-flex justify-content-center align-items-center" style={{ background: "#f8f9fa", overflowY: "auto" }}>
                <div className="card shadow-sm" style={{ minWidth: "600px", maxWidth: "800px", width: "100%" }}>
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Recent Notifications</h5>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">Email</th>
                          <th scope="col">Message</th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">220625915@tut4life.ac.za</th>
                          <td>New student assigned to your group.</td>
                          <td>2024-06-10</td>
                          <td><span className="badge bg-success">Unread</span></td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Project deadline updated.</td>
                          <td>2024-06-08</td>
                          <td><span className="badge bg-secondary">Read</span></td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Meeting scheduled for Friday.</td>
                          <td>2024-06-05</td>
                          <td><span className="badge bg-success">Unread</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </>
  );
}export default SupervisorNotifications;