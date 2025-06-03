import React, { useState } from 'react';
import { Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from '../../commponents/Sidebar';
import './technician.css';
import Profile from './profile';

const Dashboard = () => {
  const [sortOrder, setSortOrder] = useState('latest');
  const [filter, setFilter] = useState('monthly');

  const [statuses, setStatuses] = useState({
    TLS124458: 'Received',
    TLS234557: 'In Refurbishment',
    TLS345678: 'Completed',
    TLS456799: 'Completed',
  });

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

  const handleStatusChange = (serialNo, event) => {
    const updatedStatuses = { ...statuses, [serialNo]: event.target.value };
    setStatuses(updatedStatuses);
  };

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

  const handleBio = () => alert(`Bio updated to: ${formData.newBio}`);
  const handleAvailability = () => alert(`Availability updated to: ${formData.newAvailability}`);
  const handleSkills = () => alert(`Skills updated to: ${formData.skills}`);

  const getPieDataByFilter = (filter) => {
    switch (filter) {
      case 'daily':
        return [
          { name: 'Completed', value: 5 },
          { name: 'Written Off', value: 1 },
        ];
      case 'weekly':
        return [
          { name: 'Completed', value: 20 },
          { name: 'Written Off', value: 4 },
        ];
      case 'monthly':
        return [
          { name: 'Completed', value: 85 },
          { name: 'Written Off', value: 15 },
        ];
      case 'yearly':
        return [
          { name: 'Completed', value: 900 },
          { name: 'Written Off', value: 100 },
        ];
      default:
        return [
          { name: 'Completed', value: 85 },
          { name: 'Written Off', value: 15 },
        ];
    }
  };

  const pieData = getPieDataByFilter(filter);
  const COLORS = ['#00C49F', '#fc1c1c'];

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
            <div
              className="d-flex align-items-center gap-2"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowProfileModal(true)}
            >
              <img
                src=""
                alt="Profile"
                className="rounded-circle"
                style={{ width: '32px', height: '32px', backgroundColor: '#ccc' }}
              />
              <span style={{ fontWeight: '500', color: '#003366' }}>Technician</span>
            </div>
            <Button variant="outline-primary" size="sm" style={{ borderColor: '#003366', color: '#003366' }}>
              Log out
            </Button>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card body style={{ backgroundColor: '#ffffff', color: 'black' }}>
              <div>Total Laptops Received</div>
              <strong style={{ fontSize: '1.4rem' }}>150</strong>
            </Card>
          </Col>
          <Col>
            <Card body style={{ backgroundColor: '#f1fbfc', color: '#3b78a0' }}>
              <div>In Progress</div>
              <strong style={{ fontSize: '1.4rem' }}>45</strong>
            </Card>
          </Col>
          <Col>
            <Card body style={{ backgroundColor: '#409cf7', color: '#e1f2f9' }}>
              <div>Completed</div>
              <strong style={{ fontSize: '1.4rem' }}>85</strong>
            </Card>
          </Col>
          <Col>
            <Card body style={{ backgroundColor: '#fbf5f7', color: 'black' }}>
              <div>Collected</div>
              <strong style={{ fontSize: '1.4rem' }}>20</strong>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={8}>
            <h5 style={{ color: '#003366', fontWeight: '600' }}>Refurbishment Progress</h5>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: '#003366', color: 'white' }}>
                <tr>
                  <th>Serial No.</th>
                  <th>Status</th>
                  <th>Assigned Date</th>
                  <th>Upload Status</th>
                </tr>
              </thead>
              <tbody>
                {[{ serialNo: 'TLS124458', date: '2024-04-12' }, { serialNo: 'TLS234557', date: '2024-04-12' }, { serialNo: 'TLS345678', date: '2024-04-10' }, { serialNo: 'TLS456799', date: '2024-04-08' }].map((item) => (
                  <tr key={item.serialNo}>
                    <td>{item.serialNo}</td>
                    <td>{statuses[item.serialNo]}</td>
                    <td>{item.date}</td>
                    <td>
                      <Form.Select
                        value={statuses[item.serialNo]}
                        onChange={(e) => handleStatusChange(item.serialNo, e)}
                        size="sm"
                      >
                        <option value="Received">Received</option>
                        <option value="In Refurbishment">In Refurbishment</option>
                        <option value="Ready for Collection">Ready for Collection</option>
                        <option value="Written Off">Written Off</option>
                      </Form.Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Card className="mt-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span style={{ color: '#003366', fontWeight: '600' }}>Written Off vs Success Rate</span>
                <Form.Select size="sm" style={{ width: '200px' }} value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </Form.Select>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={210}>
                  <PieChart>
                    <Pie dataKey="value" isAnimationActive={true} data={pieData} cx="50%" cy="50%" outerRadius={70} label>
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
            <h5 style={{ color: '#003366', fontWeight: '600',marginTop:'20px' }}>Notifications</h5>
            <Card style={{ backgroundColor: '#ffffff' }}>
              <Card.Body>
                <Form.Select className="mb-3" size="sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="latest">Sort by Latest</option>
                  <option value="oldest">Sort by Oldest</option>
                </Form.Select>

                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                  <div
                    id="notifications-scroll"
                    style={{ maxHeight: '530px', overflowY: 'auto', paddingRight: '6px', flex: '1' }}
                  >
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
                    <div style={{ borderLeft: '2px solid #ccc', height: '100%', margin: '5px 0' }}></div>
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
