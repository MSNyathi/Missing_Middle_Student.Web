// SummaryCards.jsx
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const SummaryCards = ({ deviceCount }) => (
  <Row className="summary-cards text-center p-3">
    <Col><Card className="p-3 bg-info text-white">{deviceCount} All Devices</Card></Col>
    <Col><Card className="p-3 bg-success text-white">50 Repaired Devices</Card></Col>
    <Col><Card className="p-3 bg-warning text-dark">35 Broken Devices</Card></Col>
  </Row>
);

export default SummaryCards;
