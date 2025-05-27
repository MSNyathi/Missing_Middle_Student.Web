// src/App.js

import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import tut from './assets/tut.png';
import backgroundImage from './assets/background2.jpeg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
=======
import backgroundImage from '../src/assets/backgroundAdmin.jpeg'; // Adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 


>>>>>>> origin/TeamMerges

function App() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
  };

  return (
    <div style={backgroundStyle}>
      {/* Navbar */}
      <nav id="mynav" className="d-flex justify-content-between align-items-center p-3">
        <h1 id="myh1" className="m-0">Welcome to EduConnect</h1>
        <Link to="/login" id="mylink">
          <button id="btn" className="btn btn-light">
            <i id="i" className="bi bi-person-circle me-2" style={{ fontSize: '1.5rem' }}></i>
            SIGN IN
          </button>
        </Link>
      </nav>

<<<<<<< HEAD
      {/* Main Content */}
      <div className="text-center pt-5 flex-grow-1 d-flex align-items-start justify-content-center" style={{ paddingTop: '8vh' }}>

        <div id="mydiv">
          <h2 id="myh1">Empowering Students Through Technology</h2>
          <p id="p1">
            In today's digital age, access to technology is essential for academic success.
          </p>
          <p id="p1">
            Our initiative provides refurbished laptops to deserving students at TUT.
          </p>
          <p id="p1">
            Donate your unused laptops to help bridge the digital divide and empower future leaders.
          </p>
          <Link to="/student/login" id="mylink">
            <button id="btn" className="btn btn-primary mt-3">Get Started</button>
          </Link>
=======
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
        
>>>>>>> origin/TeamMerges
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-section text-white">
        <div className="container py-4">
          <div className="row text-center text-md-start">
            {/* Contact */}
            <div className="col-md-4 mb-4 mb-md-0">
              <h5>Contact Us</h5>
              <p>Phone: 012 123 4567</p>
              <p>Email: digitaldynamos@EduConnect.com</p>
            </div>

            {/* About */}
            <div className="col-md-4 mb-4 mb-md-0">
              <h5>EduConnect</h5>
              <p>
                Empowering students through technology by providing laptops
                to those in need at Tshwane University of Technology.
              </p>
            </div>

            {/* Socials */}
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <div className="d-flex justify-content-center justify-content-md-start gap-3">
                {[
                  { href: 'https://facebook.com', icon: 'facebook' },
                  { href: 'https://twitter.com', icon: 'twitter' },
                  { href: 'https://instagram.com', icon: 'instagram' },
                  { href: 'https://linkedin.com', icon: 'linkedin' },
                  { href: 'https://youtube.com', icon: 'youtube' },
                ].map(({ href, icon }) => (
                  <a
                    key={icon}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`footer-icon bi bi-${icon}`}
                  ></a>
                ))}
              </div>
            </div>
          </div>

          <hr className="my-4" style={{ borderColor: '#999' }} />

          <p className="text-center mb-0">&copy; {new Date().getFullYear()} EduConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
<<<<<<< HEAD
=======
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

>>>>>>> origin/TeamMerges
  );
}

export default App;
