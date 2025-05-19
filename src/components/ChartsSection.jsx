// File: ChartsSection.js
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

// Common chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

// Sample chart data
const lineData = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Devices in Excellent Condition',
      data: [40, 42, 45, 50],
      borderColor: '#4CAF50',
      backgroundColor: '#4CAF50',
      fill: false,
    },
    {
      label: 'Devices in Poor Condition',
      data: [15, 14, 13, 10],
      borderColor: '#F44336',
      backgroundColor: '#F44336',
      fill: false,
    },
  ],
};

const pieData = {
  labels: ['Excellent', 'Good', 'Fair', 'Poor'],
  datasets: [
    {
      data: [45, 30, 15, 10],
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
      hoverOffset: 4,
    },
  ],
};

const barData = {
  labels: ['Excellent', 'Good', 'Fair', 'Poor'],
  datasets: [
    {
      label: 'Device Count',
      data: [45, 30, 15, 10],
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
    },
  ],
};

// Light grey background style
const containerStyle = {
  backgroundColor: '#f8f9fa', // light grey
  padding: '15px',
  borderRadius: '8px',
};

const ChartsSection = () => (
  <Container fluid>
    <Row className="p-3">
      <Col md={12}>
        <div style={containerStyle}>
          <h4 className="mb-3">Device Condition Over Time</h4>
          <div style={{ height: '300px' }}>
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
      </Col>
    </Row>
    <Row className="p-3">
      <Col md={6}>
        <div style={containerStyle}>
          <h5 className="mb-3">Device Condition Distribution (Pie)</h5>
          <div style={{ height: '250px' }}>
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
      </Col>
      <Col md={6}>
        <div style={containerStyle}>
          <h5 className="mb-3">Device Condition Count (Bar)</h5>
          <div style={{ height: '250px' }}>
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);

export default ChartsSection;
