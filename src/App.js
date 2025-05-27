

import tut25 from './tut25.png';
import './App.css';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import backgroundImage from '../src/assets/backgroundAdmin.jpeg'; // Adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 



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
    <div id="mynav">
      <i><h2 id="p1">Sections</h2></i>
      
        <a id="landingsection1li" href="/">Home</a>
        <a id="landingsection1li" href="/announcements">Announcements</a>
        <a id="landingsection1li" href="/application-requirements">Application Requirements</a>
        <a id="landingsection1li"href="/Supervisor/Login">Supervisor</a>
      
    </div>
    <div>
      
      
      <div id="landingsection1">
      <h2 id="myh1">Empowering Students Through Technology</h2>
      <p id="p1">In today's digital age, access to technology is essential for academic success. </p>
        <p id="p1">Recognizing this need, our initiative is dedicated to providing refurbished laptops to deserving students within Tshwane University of Technology. </p>
        <p id="p1">By donating your old or unused laptops, you can help bridge the digital divide and empower the next generation of leaders.</p>
        
        
        </div>


  <section id="landingsection2" class="py-12 px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
    <h2 class="text-3xl font-semibold mb-4">Welcome to the Multi-Role Platform</h2>
    <p class="max-w-2xl mx-auto text-lg">Serving Donors, Supervisors, Admins, Students, and Technicians to streamline collaboration and support.</p>
    <nav id="mynav">
      <div class="bg-white shadow rounded-lg p-6">🎁 <p class="mt-2 font-medium">Donor</p></div>
      <div class="bg-white shadow rounded-lg p-6">🧑‍🏫 <p class="mt-2 font-medium">Supervisor</p></div>
      <div class="bg-white shadow rounded-lg p-6">🛡️ <p class="mt-2 font-medium">Admin</p></div>
      <div class="bg-white shadow rounded-lg p-6">🎓 <p class="mt-2 font-medium">Student</p></div>
      <div class="bg-white shadow rounded-lg p-6">🛠️ <p class="mt-2 font-medium">Technician</p></div>
    </nav>

  </section>

  <section class="bg-white py-16 px-6">
    <h3 class="text-2xl font-semibold text-center mb-10">Success Stories</h3>
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-gray-100 p-6 rounded-lg shadow">
        <p class="italic">"This system helped us coordinate thousands of donations to students in need!"</p>
        <p class="mt-2 font-medium">– A Grateful Donor</p>
      </div>
      <div class="bg-gray-100 p-6 rounded-lg shadow">
        <p class="italic">"Managing student repairs and device handouts has never been easier."</p>
        <p class="mt-2 font-medium">– Lead Technician</p>
      </div>
    </div>
  </section>

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
