import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import SummaryCards from './SummaryCards';
import ChartsSection from './ChartsSection';


const TechnicianDashboard = () => {
  const [devices] = useState([
    { sn: '219999490', name: 'Dell', condition: 'Good', status: 'Allocated', contract: 'South', date: '01/03/2025' },
    { sn: '212299490', name: 'Acer', condition: 'Needs Repair', status: 'Unallocated', contract: 'South', date: '01/03/2025' },
  ]);

  const monthlyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{ label: 'Applicants per month', data: [12, 10, 10, 3, 5, 10, 4, 5, 7, 3, 6, 7], borderColor: 'blue', backgroundColor: 'blue' }]
  };

  const pieData = {
    labels: ['Fixed Laptops', 'Broken Laptops'],
    datasets: [{ data: [65, 35], backgroundColor: ['green', 'red'] }]
  };

  const barData = {
    labels: ['Repaired Laptops', 'Broken Laptops'],
    datasets: [{ label: 'Devices', data: [50, 35], backgroundColor: ['blue', 'yellow'] }]
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <TopBar />
        <div className="p-4">
          <SummaryCards deviceCount={devices.length} />
          <ChartsSection lineData={monthlyData} pieData={pieData} barData={barData} />
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
