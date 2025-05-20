import React, { useState } from 'react';
import { Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [sortOrder, setSortOrder] = useState('latest');

  const notifications = [
    { message: 'Courier assigned to Job ID TLS345678', date: '2024-04-15' },
    { message: 'Device TLS234557 ready for pickup', date: '2024-04-14' },
    { message: 'Movement history updated for TLS124458', date: '2024-04-13' },
  ];

  const sortedNotifications = [...notifications].sort((a, b) => {
    if (sortOrder === 'latest') return new Date(b.date) - new Date(a.date);
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#003366', minHeight: '100vh' }}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        {/* Top Bar */}
        <Row className="align-items-center mb-4">
          <Col>
            <h2 className="mb-0" style={{ color: '#003366', fontWeight: '600' }}>Technician Dashboard</h2>
          </Col>
          <Col className="text-end d-flex align-items-center justify-content-end gap-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src="https://via.placeholder.com/32"
                alt="Profile"
                className="rounded-circle"
                style={{ width: '32px', height: '32px' }}
              />
              <span style={{ fontWeight: '500', color: '#003366' }}>John Smith</span>
            </div>
            <Button variant="outline-primary" size="sm" style={{ borderColor: '#003366', color: '#003366' }}>
              Log out
            </Button>
          </Col>
        </Row>

        {/* Summary Cards */}
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
            <Card body style={{ backgroundColor: '#365c9b', color: '#e1f2f9' }}>
              <div>Completed</div>
              <strong style={{ fontSize: '1.4rem' }}>85</strong>
            </Card>
          </Col>
          <Col>
            <Card body style={{ backgroundColor: '#fbf5f7', color: 'black' }}>
              <div>Donated</div>
              <strong style={{ fontSize: '1.4rem' }}>20</strong>
            </Card>
          </Col>
        </Row>

        {/* Main Grid */}
        <Row className="mt-4">
          {/* Table Section */}
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
                <tr><td>TLS124458</td><td>Received</td><td>2024-04-12</td><td>Not Uploaded</td></tr>
                <tr><td>TLS234557</td><td>In Refurbishment</td><td>2024-04-12</td><td>Full Uploaded</td></tr>
                <tr><td>TLS345678</td><td>Completed</td><td>2024-04-10</td><td>Uploaded</td></tr>
                <tr><td>TLS456799</td><td>Completed</td><td>2024-04-08</td><td>Uploaded</td></tr>
              </tbody>
            </Table>
          </Col>

          {/* Notifications + Upload */}
{/* Notifications + Upload */}
{/* Notifications + Upload */}
<Col md={4}>
  <h5 style={{ color: '#003366', fontWeight: '600' }}>Notifications</h5>

  <Card style={{ backgroundColor: '#ffffff' }}>
    <Card.Body>
      <Form.Select
        className="mb-3"
        size="sm"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="latest">Sort by Latest</option>
        <option value="oldest">Sort by Oldest</option>
      </Form.Select>

      {/* Scrollable Content + Buttons Side-by-Side */}
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Scrollable Notifications */}
        <div
          id="notifications-scroll"
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            paddingRight: '6px',
            flex: '1',
          }}
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

        {/* Scroll Buttons in Vertical Stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginLeft: '5px',
          }}
        >
          <Button
            variant="light"
            size="sm"
            onClick={() => {
              const container = document.getElementById('notifications-scroll');
              container.scrollTop -= 60;
            }}
          >
            🔼
          </Button>
          <div style={{ borderLeft: '2px solid #ccc', height: '100%', margin: '5px 0' }}></div>
          <Button
            variant="light"
            size="sm"
            onClick={() => {
              const container = document.getElementById('notifications-scroll');
              container.scrollTop += 60;
            }}
          >
            🔽
          </Button>
        </div>
      </div>
    </Card.Body>
  </Card>
</Col>



        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
