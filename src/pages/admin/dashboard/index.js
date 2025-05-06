// src/pages/admin/dashboard/index.js
import React from 'react';
import AdminNavbar from '../../../commponents/adminNavbar';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // Sample static data
  const totalDevices = 120;
  const totalApplicants = 75;
  const eligible = 45;
  const notEligible = 30;

  const eligibilityData = {
    labels: ['Eligible', 'Not Eligible'],
    datasets: [
      {
        label: 'Applicants',
        data: [eligible, notEligible],
        backgroundColor: ['#198754', '#dc3545'],
      },
    ],
  };

  const deviceChartData = {
    labels: ['Laptops Issued', 'Laptops Remaining'],
    datasets: [
      {
        label: 'Devices',
        data: [80, 40],
        backgroundColor: ['#0d6efd', '#ffc107'],
      },
    ],
  };

  return (
    <div className="d-flex">
      <AdminNavbar />
      <div className="flex-grow-1 p-4">
        <h1>Admin Dashboard</h1>
        <p className="text-muted">Welcome to the dashboard!</p>

        {/* Stats Summary */}
        <div className="row text-center mt-4">
          <div className="col-md-4">
            <div className="card bg-primary text-white mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Devices</h5>
                <p className="card-text fs-4">{totalDevices}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-info text-white mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Applicants</h5>
                <p className="card-text fs-4">{totalApplicants}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white mb-3">
              <div className="card-body">
                <h5 className="card-title">Eligible Applicants</h5>
                <p className="card-text fs-4">{eligible}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row">
          <div className="col-md-6">
            <div className="card p-3">
              <h6>Eligibility Overview</h6>
              <Pie data={eligibilityData} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3">
              <h6>Device Distribution</h6>
              <Bar data={deviceChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
