import React, { useState } from 'react';
import { Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import { FaUserCircle, FaSearch } from 'react-icons/fa';

const TopBar = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Technician'
  });

  return (
    <div className="top-bar d-flex justify-content-between align-items-center px-3 py-2 border-bottom bg-white shadow-sm">
      {/* Search Bar */}
      <InputGroup style={{ maxWidth: '300px' }}>
        <InputGroup.Text className="bg-white border-end-0">
          <FaSearch />
        </InputGroup.Text>
        <FormControl
          type="text"
          placeholder="Search..."
          className="border-start-0"
        />
      </InputGroup>

      {/* Dashboard Title */}
      <h5 className="mb-0 text-center flex-grow-1">Technician Dashboard</h5>

      {/* Profile Dropdown */}
      <Dropdown align="end">
        <Dropdown.Toggle variant="light" id="dropdown-profile" className="d-flex align-items-center border-0 bg-transparent">
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
  );
};

export default TopBar;
