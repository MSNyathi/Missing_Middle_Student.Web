import React from 'react';
import AdminNavbar from '../../../commponents/adminNavbar';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import backgroundImage from '../../../assets/backgroundAdmin.jpeg'



ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const Dashboard = () => {
  // Static data
  const totalDevices = 120;
  const totalApplicants = 75;
  const eligible = 45;
  const notEligible = 30;

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: 'white',
  };

  // Monthly applicants (sample data)
  const applicantTrendData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Applicants per Month',
        data: [5, 8, 12, 10, 9, 6, 15, 20, 18, 10, 8, 7],
        fill: false,
        borderColor: '#0d6efd',
        backgroundColor: '#0d6efd',
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        showLine: true,
      },
    ],
  };

  const applicantTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Applicant Trend' },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Applicants' },
      },
      x: {
        title: { display: true, text: 'Month' },
      },
    },
  };

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

  const eligibilityOptions = {
    cutout: '60%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
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

  const deviceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <AdminNavbar />
      <div style={backgroundStyle} className="flex-grow-1 p-4 d-flex flex-column overflow-auto">
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Search Bar */}
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by Student Number, Surname or initials"
            style={{ borderRadius: '20px' }}
          />

          {/* Right Side Icons */}
          <div className="d-flex align-items-center gap-3">
            <span className="text-white">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <i className="bi bi-bell fs-5"></i>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Profile"
              style={{ width: '35px', height: '35px', borderRadius: '50%' }}
            />
          </div>
        </div>

        {/* Welcome Message */}
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
          {/* Line Chart */}
          <div className="col-12 mb-4">
            <div className="card p-3" style={{ height: '300px' }}>
              <Line data={applicantTrendData} options={applicantTrendOptions} />
            </div>
          </div>

          {/* Pie and Bar Charts */}
          <div className="col-md-6 mb-3">
            <div className="card p-3" style={{ height: '300px' }}>
              <h6>Eligibility Overview</h6>
              <div className="h-100 d-flex justify-content-center align-items-center">
                <Pie data={eligibilityData} options={eligibilityOptions} />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card p-3" style={{ height: '300px' }}>
              <h6>Device Distribution</h6>
              <div className="h-100 d-flex justify-content-center align-items-center">
                <Bar data={deviceChartData} options={deviceOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
