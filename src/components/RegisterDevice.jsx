import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const RegisterDevice = ({ newDevice, onInputChange, onRegister }) => {
  const [device, setDevice] = useState({
    sn: '',
    name: '',
    model: '',
    condition: 'Good'
  });

  useEffect(() => {
    if (newDevice) {
      setDevice(newDevice);
    }
  }, [newDevice]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <div className="p-4">
          <Stack gap={2} className="text-center">
            <h2>Register New Device</h2>
            <p>Fill in the details below to register a new device.</p>
          </Stack>
          <Form>
            <Row className="mb-3">
              <Col>
                <FloatingLabel controlId="floatingSerialNumber" label="Serial Number">
                  <Form.Control
                    type="text"
                    placeholder="Serial Number"
                    name="sn"
                    value={device.sn}
                    onChange={onInputChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <FloatingLabel controlId="floatingBrand" label="Brand">
                  <Form.Control
                    type="text"
                    placeholder="Brand"
                    name="name"
                    value={device.name}
                    onChange={onInputChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingModel" label="Model">
                  <Form.Control
                    type="text"
                    placeholder="Model"
                    name="model"
                    value={device.model}
                    onChange={onInputChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Select
                  name="condition"
                  value={device.condition}
                  onChange={onInputChange}
                >
                  <option>Good</option>
                  <option>Needs Repair</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Button variant="primary" onClick={onRegister}>Register Device</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterDevice;
