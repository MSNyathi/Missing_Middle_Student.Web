import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const TopBar = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Technician'
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div
      className="top-bar d-flex justify-content-between align-items-center px-3 py-2 border-bottom shadow-sm position-sticky top-0 z-3"
      style={{ backgroundColor: '#9dc6e0', color: 'white' }}
    >
      {/* Greeting on the left */}
      <div className="fw-semibold">
        {getGreeting()},{' '}
        <span className="fw-bold" style={{ color: '#FFD700' }}>{user.name}</span>. Welcome to the dashboard!
      </div>

      {/* Time & Profile on the right */}
      <div className="d-flex align-items-center gap-3">
        <span className="small">{formattedTime}</span>

        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            id="dropdown-profile"
            className="d-flex align-items-center border-0 bg-transparent text-white"
            style={{ color: 'white' }}
          >
            <FaUserCircle size={28} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="px-3 py-2">
              <strong>{user.name}</strong>
              <div className="text-muted small">{user.role}</div>
              <div className="text-muted small">{user.email}</div>
            </div>
            <Dropdown.Divider />
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopBar;
