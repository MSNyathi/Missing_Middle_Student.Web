

import tut25 from './tut25.png';
import './App.css';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import backgroundImage from '../src/assets/backgroundAdmin.jpeg'; // Adjust path if needed
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TechnicianDashboard from './components/TechnicianDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import { Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import SummaryCards from './components/SummaryCards';
import ChartsSection from './components/ChartsSection';
import DeviceTable from './components/DeviceTable';
import RegisterDevice from './components/RegisterDevice';

function App() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: 'white', // Optional: ensure text is readable
  };

  return (

    <>
    <nav id="mynav">
      <Link to="/">
      <img id="myimg" src={tut25} classname="bcolor"/>
      </Link>
      <h1 id="myh1">Welcome to EduConnect</h1>
      <Link to="/login" id="mylink">
      <button id="btn"><i id="i" className="bi bi-person-circle" style={{ fontSize: '1.5rem' } }></i>SIGN IN</button>
      </Link>
    </nav>
    <div className="text-center p-5">
      
      
      <div id="mydiv">
      <h2 id="myh1">Empowering Students Through Technology</h2>
      <p id="p1">In today's digital age, access to technology is essential for academic success. </p>
        <p id="p1">Recognizing this need, our initiative is dedicated to providing refurbished laptops to deserving students within Tshwane University of Technology. </p>
        <p id="p1">By donating your old or unused laptops, you can help bridge the digital divide and empower the next generation of leaders.</p>
        <Link to="/register" id="mylink">
          <button id="btn">Get Started</button>
        </Link>
        
        </div>
    
    </div>
    <footer id="footer">
      <p id="p3">© 2023 EduConnect. All rights reserved.</p>
      <p id="p3">Contact us: 012 123 4567</p>
      <p id="p3">Email: digitaldynamos@EduConnect.com</p>
      <p id="p3">Follow us on social media: 
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook">facebook  </i></a>
        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter">twitter  </i></a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram">instagram  </i></a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin">linkedin  </i></a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-youtube">youtube  </i></a>
      </p>
    </footer>
    </>

  );
}

export default App;
