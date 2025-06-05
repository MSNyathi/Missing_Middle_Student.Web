import React from 'react';
import tut25 from '../../../../assets/logo2.png';
import '../../../../landingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function SupervisorNotifications() {
  const notifications = [
    {
      email: "KhozaPK@tut.ac.za",
      title: "New Donation request received.",
      date: "2025-06-03",
      status: "Unread"
    },
    {
      email: "technician@tut.ac.za",
      title: "Laptops received.",
      date: "2025-06-02",
      status: "Unread"
    },
    {
      email: "MatlalaMM@tut.ac.za",
      title: "Meeting scheduled for Friday.",
      date: "2025-05-28",
      status: "Read"
    },
    {
      email: "MtombeniT@tut.ac.za",
      title: "New Donation request received.",
      date: "2025-05-25",
      status: "Read"
    },
    {
      email: "NkosiHM@tut4life.ac.za",
      title: "New Donation request received.",
      date: "2025-05-20",
      status: "Read"
    },
    {
      email: "MereOF@tut.ac.za",
      title: "New Donation request received.",
      date: "2025-05-15",
      status: "Read"
    }
  ];
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
                  <div className="card-body p-0">
                    <table
                      className="table table-hover mb-0"
                      style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "8px 4px 16px rgba(0, 0, 0, 0.6), 0 1.5px 4px rgba(0,0,0,0.08)"
                      }}
                    >
                      <thead className="table-light">
                        <tr>
                          <th scope="col" style={{ width: "200px" }}>Email</th>
                          <th scope="col">Message</th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notifications.map((notification, idx) => (
                          <tr key={idx}>
                            <th
                              scope="row"
                              style={{
                                width: "180px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                backgroundColor: "#888888"
                              }}
                            >
                              {notification.email}
                            </th>
                            <td>{notification.title}</td>
                            <td>{notification.date}</td>
                            <td>
                              <span className={`badge ${notification.status === "Unread" ? "bg-success" : "bg-secondary"}`}>
                                {notification.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              
            </div>
      </div>
    </>
  );
}export default SupervisorNotifications;