
// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';
test('App renders without crashing', () => {
  render(<App />);
  // Optionally check for any element, e.g.:
  expect(screen.getByRole('heading')).toBeInTheDocument();
});
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterDevice from '../components/RegisterDevice';
import Devices from '../components/DeviceTable';
import Logout from './components/Logout';
import TechnicianDashboard from './components/TechnicianDashboard';

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="p-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<TechnicianDashboard />} />
            <Route path="/register" element={<RegisterDevice />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

