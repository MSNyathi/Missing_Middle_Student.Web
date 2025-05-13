// RegisterDevice.jsx
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const RegisterDevice = ({ newDevice, onInputChange, onRegister }) => (
  <Row className="p-3">
    <h5>Register Device</h5>
    <Form>
      <Row className="g-2">
        <Col><Form.Control placeholder="Serial Number" name="sn" value={newDevice.sn} onChange={onInputChange} /></Col>
        <Col><Form.Control placeholder="Brand" name="name" value={newDevice.name} onChange={onInputChange} /></Col>
        <Col><Form.Control placeholder="Model" name="model" value={newDevice.model} onChange={onInputChange} /></Col>
        <Col>
          <Form.Select name="condition" value={newDevice.condition} onChange={onInputChange}>
            <option>Good</option>
            <option>Needs Repair</option>
          </Form.Select>
        </Col>
        <Col><Button onClick={onRegister}>Register Device</Button></Col>
      </Row>
    </Form>
  </Row>
);

export default RegisterDevice;
