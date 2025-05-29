import React from 'react';
import { Link } from 'react-router-dom';
import tut from './assets/tut.png';
import backgroundImage from './assets/background2.jpeg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

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
        <Link to="/">
          <img id="myimg" src={tut} alt="TUT Logo" className="bcolor" />
        </Link>
        <h1 id="myh1" className="m-0">Welcome to EduConnect</h1>
      </nav>

      {/* Landing Section */}
      <section id="landingsection2" className="py-4 px-3 text-center">
        <h2 id="p1">The Multi-Role Platform</h2>
        <p id="p1" className="max-w-2xl mx-auto text-lg">
          Serving Donors, Supervisors, Admins, Students, and Technicians to streamline collaboration and support.
        </p>
        <nav className="mt-4 d-flex flex-column gap-2 align-items-center">
          <Link to="/donorLogin"><p id="landingsection1li" className="font-medium">🎁 Donor</p></Link>
          <Link to="/Supervisor/Login"><p id="landingsection1li" className="font-medium">🧑‍🏫 Supervisor</p></Link>
          <Link to="/admin/login"><p id="landingsection1li" className="font-medium">🛡️ Admin</p></Link>
          <Link to="/student/login"><p id="landingsection1li" className="font-medium">🎓 Student</p></Link>
          <Link to="/admin/login"><p id="landingsection1li" className="font-medium">🛠️ Technician</p></Link>
        </nav>
      </section>

      {/* Info Section */}
      <div id="landingsection3" className="px-3">
        <div id="landingsection1">
          <h2 id="myh1">Empowering Students Through Technology</h2>
          <p id="p1">In today's digital age, access to technology is essential for academic success.</p>
          <p id="p1">Our initiative provides refurbished laptops to deserving students at Tshwane University of Technology.</p>
          <p id="p1">Donate your unused laptops to help bridge the digital divide and empower future leaders.</p>
        </div>

        <div id="landingsection1">
          <h1 id="myh1">Application Requirements</h1>
          <p id="p1">To apply for a refurbished laptop, please ensure you meet the following requirements:</p>
          <ul id="requirements-list">
            <li id="p1">Must be a registered student at Tshwane University of Technology.</li>
            <li id="p1">Demonstrated financial need.</li>
            <li id="p1">Commitment to using the laptop for academic purposes.</li>
            <li id="p1">Agreement to the terms and conditions of the laptop program.</li>
            <li id="p1">Must not have received a laptop from this program in the past.</li>
            <li id="p1">Must provide a valid student ID and proof of registration.</li>
          </ul>
          <p id="p1">If you meet these requirements, please proceed to the application form.</p>
        </div>
      </div>

      {/* Success Stories */}
      <section id="landingsection3" className="px-3">
        <h3 id="myh1">Success Stories</h3>
        <div id="landingsection3div">
          <div id="landingsection3div2">
            <p className="italic">"This system helped us coordinate thousands of donations to students in need!"</p>
            <p className="mt-2 font-medium">– A Grateful Donor</p>
          </div>
          <div id="landingsection3div2">
            <p className="italic">"Managing student repairs and device handouts has never been easier."</p>
            <p className="mt-2 font-medium">– Lead Technician</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section text-white mt-auto">
        <div className="container py-4">
          <div className="row text-center text-md-start">
            <div className="col-md-4 mb-4">
              <h5>Contact Us</h5>
              <p>Phone: 012 123 4567</p>
              <p>Email: digitaldynamos@EduConnect.com</p>
            </div>

            <div className="col-md-4 mb-4">
              <h5>EduConnect</h5>
              <p>
                Empowering students through technology by providing laptops
                to those in need at Tshwane University of Technology.
              </p>
            </div>

            <div className="col-md-4">
              <h5>Follow Us</h5>
              <div className="d-flex justify-content-center justify-content-md-start gap-3">
                {[
                  { href: 'https://www.facebook.com/IcepDev/', icon: 'facebook' },
                  { href: 'https://twitter.com', icon: 'twitter' },
                  { href: 'https://www.instagram.com/icep.project?igsh=MTIzbncxZjFsZDJmNg==', icon: 'instagram' },
                  { href: 'https://www.linkedin.com/company/icep-project/posts/?feedView=all', icon: 'linkedin' },
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
  );
}

export default App;
