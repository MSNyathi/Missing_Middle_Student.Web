import React from 'react';
import Sidebar from '../../commponents/Sidebar'; // Keep your correct path here
import './devicesTable.css'; // Import the CSS file

function DonatedLaptops() {
  const laptopData = [
    { id: 1, brand: 'Dell', model: 'XPS 13', donor: 'Alice' },
    { id: 2, brand: 'HP', model: 'EliteBook', donor: 'Bob' },
    { id: 3, brand: 'Apple', model: 'MacBook Pro', donor: 'Charlie' }
  ];

  return (
    <div style={{ display: 'flex', background: '#f2f0f1' }}>
      <div style={{ width: '250px', backgroundColor: '#003366', minHeight: '100vh' }}>
        <Sidebar />
      </div>
      <div style={{ padding: '20px', flex: 1 }}>
        <h2>Donated Laptops</h2>

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
          <table id='written'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Donor</th>
              </tr>
            </thead>
            <tbody>
              {laptopData.length > 0 ? (
                laptopData.map((laptop) => (
                  <tr key={laptop.id}>
                    <td>{laptop.id}</td>
                    <td>{laptop.brand}</td>
                    <td>{laptop.model}</td>
                    <td>{laptop.donor}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No laptops donated yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DonatedLaptops;
