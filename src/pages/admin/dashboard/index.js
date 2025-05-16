import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../../commponents/adminNavbar';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
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
import backgroundImage from '../../../assets/backgroundAdmin.jpeg';
import { useLocation } from 'react-router-dom';

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
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [totalDevices, setTotalDevices] = useState(0);
  const [allocatedDevices, setAllocatedDevices] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [approvedApplicants, setApprovedApplicants] = useState(0);
  const [unapprovedApplicants, setUnapprovedApplicants] = useState(0);
  const [monthlyApplicants, setMonthlyApplicants] = useState(Array(12).fill(0));

  const location = useLocation();
  const fallbackData = {
    device_Info: {},
    applicants_Data: {},
    applicants_Montly_Data: Array(12).fill(0),
  };

  const rawData = location.state?.mydata  || JSON.parse(localStorage.getItem("adminData"));
  const data = typeof rawData === 'object' && rawData?.data
    ? rawData
    : { data: fallbackData };

  useEffect(() => {
    

   

    const safeData = data.data || {};

    setTotalDevices(safeData.device_Info?.Total_devices || 0);
    setAllocatedDevices(safeData.device_Info?.Allocated_devices || 0);
    setApprovedApplicants(safeData.applicants_Data?.Approved_Applicants || 0);
    setUnapprovedApplicants(safeData.applicants_Data?.Unapproved_Applicants || 0);
    setTotalApplicants(safeData.applicants_Data?.Total_Applicants || 0);
    setMonthlyApplicants(safeData.applicants_Montly_Data || Array(12).fill(0));
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: 'white',
  };

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  };

  const hoverEffect = {
    whileHover: { scale: 1.03, boxShadow: '0 0 15px red' },
    transition: { type: 'spring', stiffness: 300 },
  };

  const pulseLine = {
    animate: {
      opacity: [1, 0.5, 1],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const applicantTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Applicants per Month',
      data: monthlyApplicants,
      fill: false,
      borderColor: '#00ffff',
      backgroundColor: '#00ffff',
      tension: 0.4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#00ffff',
      pointHoverBackgroundColor: '#00ffff',
      pointHoverBorderColor: '#fff',
      pointRadius: 6,
      pointHoverRadius: 8,
      borderWidth: 3,
    }],
  };

  const applicantTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#fff' }, position: 'top' },
      title: {
        display: true,
        text: 'Monthly Applicant Trend',
        color: '#fff',
        font: { size: 18 }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#fff' },
        title: { display: true, text: 'Applicants', color: '#fff' },
      },
      x: {
        ticks: { color: '#fff' },
        title: { display: true, text: 'Month', color: '#fff' },
      },
    },
  };

  const eligibilityData = {
    labels: ['Approved', 'Unapproved'],
    datasets: [{
      label: 'Applicants',
      data: [approvedApplicants, unapprovedApplicants],
      backgroundColor: ['#28a745', '#dc3545'],
      borderColor: ['#ffffff', '#ffffff'],
      borderWidth: 2,
    }],
  };

  const eligibilityOptions = {
    cutout: '60%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#fff' } },
      title: {
        display: true,
        text: 'Eligibility Distribution',
        color: '#ffffff',
        font: { size: 16 }
      },
    },
  };

  const deviceChartData = {
    labels: ['Allocated', 'Unallocated'],
    datasets: [{
      label: 'Devices',
      data: [allocatedDevices, totalDevices - allocatedDevices],
      backgroundColor: ['#00d8ff', '#ffcd56'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  const deviceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#fff' } },
      title: {
        display: true,
        text: 'Laptop Allocation',
        color: '#fff',
        font: { size: 16 }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#fff' },
        title: { display: true, text: 'Devices', color: '#fff' },
      },
      x: {
        ticks: { color: '#fff' },
        title: { display: true, text: 'Category', color: '#fff' },
      },
    },
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <AdminNavbar />
      <div style={backgroundStyle} className="flex-grow-1 p-4 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by Student Number, Surname or initials"
            style={{ borderRadius: '20px' }}
          />
          <div className="d-flex align-items-center gap-3 text-white">
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <i className="bi bi-bell fs-5"></i>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Profile"
              style={{ width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer' }}
              onClick={() => setShowProfileModal(true)}
            />
          </div>
        </div>

        <h1 className="text-white">Admin Dashboard</h1>
        <p className="text-light">Welcome to the dashboard!</p>

        <div className="row text-center mt-4">
          {[{
            title: 'Total Devices',
            value: totalDevices,
            color: 'primary'
          }, {
            title: 'Total Applicants',
            value: totalApplicants,
            color: 'info'
          }, {
            title: 'Eligible Applicants',
            value: approvedApplicants,
            color: 'success'
          }].map((stat, idx) => (
            <div className="col-md-4 mb-3" key={idx}>
              <motion.div {...hoverEffect} className={`card bg-${stat.color} text-white`} style={glassCardStyle}>
                <div className="card-body">
                  <h5 className="card-title">{stat.title}</h5>
                  <p className="card-text fs-4">{stat.value}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 mb-4">
            <motion.div {...pulseLine} className="card p-3" style={{ height: '300px', ...glassCardStyle }}>
              <Line data={applicantTrendData} options={applicantTrendOptions} />
            </motion.div>
          </div>

          <div className="col-md-6 mb-3">
            <motion.div {...hoverEffect} className="card p-3" style={{ height: '300px', ...glassCardStyle }}>
              <h6 className="text-black">Eligibility Overview</h6>
              <div className="h-100">
                <Pie data={eligibilityData} options={eligibilityOptions} />
              </div>
            </motion.div>
          </div>

          <div className="col-md-6 mb-3">
            <motion.div {...hoverEffect} className="card p-3" style={{ height: '300px', ...glassCardStyle }}>
              <h6 className="text-black">Device Distribution</h6>
              <div className="h-100">
                <Bar data={deviceChartData} options={deviceOptions} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showProfileModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1050,
          }}
          onClick={() => setShowProfileModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4"
            style={{
              ...glassCardStyle,
              width: '350px',
              color: '#fff',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Profile"
                className="rounded-circle"
                style={{ width: '80px', height: '80px' }}
              />
              <h5 className="mt-3">Admin Name</h5>
              <p className="text-muted">admin@example.com</p>
            </div>
            <hr className="text-white" />
            <div className="d-grid gap-2">
              <button className="btn btn-outline-light">Profile Settings</button>
              <button className="btn btn-outline-danger">Logout</button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowProfileModal(false)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
