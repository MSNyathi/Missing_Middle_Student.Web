import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaMapMarkedAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentDashboard = () => {
  return (
    <div className="container text-center mt-5">
      <h2 className="mb-5">WELCOME TO EduConnect</h2>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <Link to="/student/apply" className="text-decoration-none">
            <div className="card p-4 shadow-lg">
              <FaLaptopCode size={100} className="mx-auto mb-3" />
              <h5 className="text-dark">APPLY FOR LAPTOP</h5>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/student/track" className="text-decoration-none">
            <div className="card p-4 shadow-lg">
              <FaMapMarkedAlt size={100} className="mx-auto mb-3" />
              <h5 className="text-dark">TRACK APPLICATION</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
