

//import tut25 from './tut25.png';
import './App.css';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import backgroundImage from '../src/assets/backgroundAdmin.jpeg'; // Adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';
import './landingPage.css'; // Import your CSS file for styling



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
      {/* Uncomment if you want to use the logo image 
      <Link to="/">
      <img id="myimg" src={tut25} classname="bcolor"/>
      </Link>*/}
      <h1 id="myh1">Welcome to EduConnect</h1>
      
    </nav>
    
    <section id="landingsection2" class="py-12 px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
    <h2 id="p1">The Multi-Role Platform</h2>
    <p id="p1" class="max-w-2xl mx-auto text-lg">Serving Donors, Supervisors, Admins, Students, and Technicians to streamline collaboration and support.</p>
    <nav id="">

      <p id="landingsection1li" class="mt-2 font-medium">🎁Donor</p>
      <Link to="/Supervisor/Login">
        <p id="landingsection1li" class="mt-2 font-medium">🧑‍🏫Supervisor</p>
      </Link>
      <Link to="/admin/login">
        <p id="landingsection1li" class="mt-2 font-medium">🛡️Admin</p>
      </Link>
      <Link to="/student/login" id="mylink">
        <p id="landingsection1li" class="mt-2 font-medium">🎓Student</p>
      </Link>
      <Link to="/admin/login">
      <p id="landingsection1li" class="mt-2 font-medium">🛠️Technician</p>
      </Link>
    </nav>

  </section>
  <section id="landingsection3">
      <div>
                <h1 id="myh1">Announcements</h1>
                <p id="p1">Stay updated with the latest announcements and news related to the laptop donation program.</p>
                {/* Add your announcements content here */}
            </div>
  </section>
    <div id="landingsection3">
      
      
      <div id="landingsection1">
      <h2 id="myh1">Empowering Students Through Technology</h2>
      <p id="p1">In today's digital age, access to technology is essential for academic success. </p>
        <p id="p1">Recognizing this need, our initiative is dedicated to providing refurbished laptops to deserving students within Tshwane University of Technology. </p>
        <p id="p1">By donating your old or unused laptops, you can help bridge the digital divide and empower the next generation of leaders.</p>
        
        
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
  <section id="landingsection3">
    <h3 id="myh1">Success Stories</h3>
    <div id="landingsection3div">
      <div id="landingsection3div2">
        <p class="italic">"This system helped us coordinate thousands of donations to students in need!"</p>
        <p class="mt-2 font-medium">– A Grateful Donor</p>
      </div>
      <div id="landingsection3div2">
        <p class="italic">"Managing student repairs and device handouts has never been easier."</p>
        <p class="mt-2 font-medium">– Lead Technician</p>
      </div>
    </div>
  </section>

   
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
