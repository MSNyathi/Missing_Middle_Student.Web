import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Form, Pagination } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from '../../commponents/Sidebar';
import Profile from './profile';
import './technician.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState([]);
  const [sortOrder, setSortOrder] = useState('latest');
  const [filter, setFilter] = useState('monthly');
  const [statuses, setStatuses] = useState({});
  const [key, setKey] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [settingsMode, setSettingsMode] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    newEmail: '',
    newBio: '',
    newAvailability: '',
    skills: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const totalPages = Math.ceil(deviceInfo.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentDevices = deviceInfo.slice(startIndex, startIndex + rowsPerPage);

  const location = useLocation();
  const my_data = location.state?.mydata?.data;

  useEffect(() => {
    if (my_data?.serial_Details?.Devices) {
      setDeviceInfo(my_data.serial_Details.Devices);
    }
    setDashboardData(my_data);
  }, [my_data]);

  const handleStatusChange = async (serialNo, event) => {
    const newStatus = event.target.value;
    setStatuses((prev) => ({ ...prev, [serialNo]: newStatus }));
    setKey(serialNo);
    try {
      const res = await axios.put(`https://localhost:7102/updateDeviceStatus?serialNumber=${serialNo}&Status=${newStatus}`);
      console.log("Status update response:", res.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleBio = () => alert(`Bio updated to: ${formData.newBio}`);
  const handleAvailability = () => alert(`Availability updated to: ${formData.newAvailability}`);
  const handleSkills = () => alert(`Skills updated to: ${formData.skills}`);

  const getPieDataByFilter = (filter) => {
    const completed = dashboardData?.laptop_Info?.Completed || 0;
    switch (filter) {
      case 'daily': return [{ name: 'Completed', value: completed }, { name: 'Written Off', value: 1 }];
      case 'weekly': return [{ name: 'Completed', value: completed }, { name: 'Written Off', value: 4 }];
      case 'monthly': return [{ name: 'Completed', value: completed }, { name: 'Written Off', value: 15 }];
      case 'yearly': return [{ name: 'Completed', value: completed }, { name: 'Written Off', value: 100 }];
      default: return [{ name: 'Completed', value: completed }, { name: 'Written Off', value: 15 }];
    }
  };

  const pieData = getPieDataByFilter(filter);
  const COLORS = ['#00C49F', '#fc1c1c'];

  const notifications = [
    { message: 'Courier assigned to Job ID TLS345678', date: '2024-04-15' },
    { message: 'Device TLS234557 ready for pickup', date: '2024-04-14' },
    { message: 'Movement history updated for TLS124458', date: '2024-04-13' },
    { message: 'Waiting collection TLS124458', date: '2024-04-14' },
    { message: 'Movement history updated for TLS345678', date: '2024-04-15' },
    { message: 'Collected TLS124458', date: '2025-04-16' },
    { message: 'Device TLS124458 not collected', date: '2025-04-13' },
  ];

  const sortedNotifications = [...notifications].sort((a, b) => {
    return sortOrder === 'latest'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="d-flex">
      <div style={{ width: '250px', backgroundColor: '#003366', minHeight: '100vh' }}>
        <Sidebar />
      </div>

      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        <Row className="align-items-center mb-4">
          <Col>
            <h2 className="mb-0" style={{ color: '#003366', fontWeight: '600' }}>Technician Dashboard</h2>
          </Col>
          <Col className="text-end d-flex align-items-center justify-content-end gap-3">
            <div className="d-flex align-items-center gap-2" onClick={() => setShowProfileModal(true)} style={{ cursor: 'pointer' }}>
              <img src="" alt="Profile" className="rounded-circle" style={{ width: '32px', height: '32px', backgroundColor: '#ccc' }} />
              <span style={{ fontWeight: '500', color: '#003366' }}>Technician</span>
            </div>
            <Button variant="outline-primary" size="sm" style={{ borderColor: '#003366', color: '#003366' }}>Log out</Button>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col><Card body><div>Total Laptops Received</div><strong>{my_data?.laptop_Info?.Total_devices || 0}</strong></Card></Col>
          <Col><Card body style={{ backgroundColor: '#f1fbfc' }}><div>In Progress</div><strong>{my_data?.laptop_Info?.in_progress || 0}</strong></Card></Col>
          <Col><Card body style={{ backgroundColor: '#409cf7', color: '#fff' }}><div>Completed</div><strong>{my_data?.laptop_Info?.Completed || 0}</strong></Card></Col>
          <Col><Card body><div>Collected</div><strong>20</strong></Card></Col>
        </Row>

        <Row className="mt-4">
          <Col md={8}>
            <h5 style={{ color: '#003366', fontWeight: '600' }}>Refurbishment Progress</h5>

            <div style={{ height: '260px', overflowY: 'auto' }}>
              <Table striped bordered hover responsive>
                <thead style={{ backgroundColor: '#003366', color: 'white' }}>
                  <tr>
                    <th>Serial No.</th>
                    <th>Assigned Date</th>
                    <th>Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDevices.length > 0 ? (
                    currentDevices.map((device) => (
                      <tr key={device.serialNumber}>
                        <td>{device.serialNumber}</td>
                        <td>{device.registeredDate}</td>
                        <td>{device.fixedStatus}</td>
                        <td>
                          <Form.Select
                            value={statuses[device.serialNumber] || device.fixedStatus}
                            onChange={(e) => handleStatusChange(device.serialNumber, e)}
                            size="sm"
                          >
                            <option value="" disabled>{device.fixedStatus}</option>
                            <option value="Received">Received</option>
                            <option value="In_Refurbishment">In Refurbishment</option>
                            <option value="Ready_For_collection">Ready For Collection</option>
                            <option value="Written_Off">Written Off</option>
                          </Form.Select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No devices found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-3 justify-content-center">
                <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                {[...Array(totalPages).keys()].map((pageNum) => (
                  <Pagination.Item
                    key={pageNum + 1}
                    active={currentPage === pageNum + 1}
                    onClick={() => setCurrentPage(pageNum + 1)}
                  >
                    {pageNum + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
              </Pagination>
            )}

            <Card className="mt-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span style={{ color: '#003366', fontWeight: '600' }}>Written Off vs Success Rate</span>
                <Form.Select size="sm" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: '200px' }}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </Form.Select>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={210}>
                  <PieChart>
                    <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={70} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <h5 style={{ color: '#003366', fontWeight: '600', marginTop: '20px' }}>Notifications</h5>
            <Card>
              <Card.Body>
                <Form.Select className="mb-3" size="sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="latest">Sort by Latest</option>
                  <option value="oldest">Sort by Oldest</option>
                </Form.Select>

                <div style={{ display: 'flex' }}>
                  <div id="notifications-scroll" style={{ maxHeight: '530px', overflowY: 'auto', paddingRight: '6px', flex: 1 }}>
                    <ul className="list-unstyled mb-0">
                      {sortedNotifications.map((note, index) => (
                        <li key={index} className="mb-2">
                          <Card body className="p-2" style={{ backgroundColor: '#f7f9fc', color: '#003366' }}>
                            <div>{note.message}</div>
                            <small className="text-muted">{note.date}</small>
                          </Card>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '5px' }}>
                    <Button variant="light" size="sm" onClick={() => {
                      const container = document.getElementById('notifications-scroll');
                      container.scrollTop -= 60;
                    }}>🔼</Button>
                    <div style={{ borderLeft: '2px solid #ccc', height: '100%' }}></div>
                    <Button variant="light" size="sm" onClick={() => {
                      const container = document.getElementById('notifications-scroll');
                      container.scrollTop += 60;
                    }}>🔽</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Profile
          formData={formData}
          setFormData={setFormData}
          showProfileModal={showProfileModal}
          setShowProfileModal={setShowProfileModal}
          settingsMode={settingsMode}
          setSettingsMode={setSettingsMode}
          handleBio={handleBio}
          handleAvailability={handleAvailability}
          handleSkills={handleSkills}
        />
      </div>
    </div>
  );
};

export default Dashboard;