import React, { useState, useEffect } from 'react';
import Sidebar from '../../commponents/Sidebar';
import './devicesTable.css';
import axios from 'axios';

function WrittenOfLaptops() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [laptopData, setLaptopData] = useState([]);

  useEffect(() => {
    axios
      .get('https://localhost:7102/AllDevices?page=1&pageSize=10')
      .then((response) => {
        const writtenOffDevices = response.data.devices.filter(
          (device) => device.fixedStatus.toLowerCase() === 'written_off'
        );
        setLaptopData(writtenOffDevices);
      })
      .catch((error) => {
        console.error('Error fetching devices:', error);
      });
  }, []);

  const filteredLaptops = laptopData
    .filter((laptop) =>
      [laptop.brand, laptop.model, laptop.serialNumber].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortBy === 'brand') return a.brand.localeCompare(b.brand);
      if (sortBy === 'serialNumber') return a.serialNumber.localeCompare(b.serialNumber);
      return 0;
    });

  return (
    <div style={{ display: 'flex', background: '#f2f0f1' }}>
      <div style={{ width: '250px', backgroundColor: '#003366', minHeight: '100vh' }}>
        <Sidebar />
      </div>
      <div style={{ padding: '20px', flex: 1 }}>
        <h2>Written OFF Laptops</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            placeholder="Search by brand, model, or serial number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ width: '250px' }}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
            style={{ width: '200px' }}
          >
            <option value="">Sort By</option>
            <option value="brand">Brand</option>
            <option value="serialNumber">Serial No.</option>
          </select>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '10px',
            padding: '20px',
            width: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          }}
        >
          <table id="written">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Condition</th>
                <th>Fixed_Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLaptops.length > 0 ? (
                filteredLaptops.map((laptop, index) => (
                  <tr key={index}>
                    <td>{laptop.serialNumber}</td>
                    <td>{laptop.brand}</td>
                    <td>{laptop.model}</td>
                    <td>{laptop.condition}</td>
                    <td>{laptop.fixedStatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No laptops written OFF.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WrittenOfLaptops;
