import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all necessary chart types and components
Chart.register(...registerables);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // allows setting custom height
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const ChartsSection = ({ lineData, pieData, barData }) => (
  <>
    <Row className="p-3">
      <Col md={12}>
        <div style={{ height: '300px' }}>
          <Line data={lineData} options={chartOptions} />
        </div>
      </Col>
    </Row>
    <Row className="p-3">
      <Col md={6}>
        <div style={{ height: '250px' }}>
          <Pie data={pieData} options={chartOptions} />
        </div>
      </Col>
      <Col md={6}>
        <div style={{ height: '250px' }}>
          <Bar data={barData} options={chartOptions} />
        </div>
      </Col>
    </Row>
  </>
);

export default ChartsSection;
