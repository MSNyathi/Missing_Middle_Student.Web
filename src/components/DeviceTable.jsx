// DeviceTable.jsx
import React from 'react';
import { Row, Table } from 'react-bootstrap';

const DeviceTable = ({ devices }) => (
  <Row className="p-3">
    <h5>Devices</h5>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Serial Number</th>
          <th>Device Name</th>
          <th>Condition</th>
          <th>Status</th>
          <th>Contract</th>
          <th>Allocation Date</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((d, i) => (
          <tr key={i}>
            <td>{d.sn}</td>
            <td>{d.name}</td>
            <td>{d.condition}</td>
            <td>{d.status}</td>
            <td>{d.contract}</td>
            <td>{d.date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Row>
);

export default DeviceTable;
