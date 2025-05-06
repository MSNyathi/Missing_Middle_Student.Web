// src/pages/admin/dashboard/index.js
import React from 'react';
import AdminNavbar from '../../../commponents/adminNavbar';

const Dashboard = () => {
  return (
    <div className="d-flex">
      <AdminNavbar />
      <div className="flex-grow-1 p-4">
        <h1>Admin Dashboard</h1>
        <p className="text-muted">Welcome to the dashboard!</p>

        {/* Sample Bootstrap Card */}
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Overview</h5>
            <p className="card-text">You can add charts, statistics, or quick actions here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
