

import tut25 from './assets/tut25.png'; // Adjust the path to your image
//import './App.css';
import React from 'react';
import './LandingPage2.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
//import backgroundImage from '../src/assets/backgroundAdmin.jpeg'; // Adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';
import './landingPage.css'; // Import your CSS file for styling



function App() {
  /*const backgroundStyle = {
    //backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: 'white', // Optional: ensure text is readable
  };*/

  return (

    <>
    <nav id="mynavv">
      <Link to="/">
        <img id="myimg" src={tut25} classname="bcolor"/>
      </Link>
      <h1 id="myh1">EduConnect</h1>
    </nav>
    {/*=============================================*/} 

    
      <section id="lpsection1">
        
        <div>
          <div>
            <h2 id="myh1">Welcome to EduConnect</h2>
            <h2 id="p1">Empowering Students Through Technology</h2>
            <div>
              <p id="p1">In today's digital age, access to technology is essential for academic success. </p>
              <p id="p1">Recognizing this need, our initiative is dedicated to providing refurbished laptops to deserving students within Tshwane University of Technology. </p>
              <p id="p1">By donating your old or unused laptops, you can help bridge the digital divide and empower the next generation of leaders.</p>
        
            </div>
            
          </div>
          
        
        </div>
      </section>
      <section id="lpsection2">
        
        <div id="lpsection2div1">
          <Link to="/landing/userloginpages" id="nolink"> 
          <div id="lpsection2div1div1">
            <div id="lpsection2div1div1div1">
              <h3>Login</h3>
            </div>
            
          </div>
          </Link>
        </div>
        
        <div id="lpsection2div2">
          <Link to="/landing/announcements" id="nolink">
          <div id="lpsection2div1div1">
            <div id="lpsection2div1div1div1">
              <h3>Announcements</h3>
            </div>
            
          </div>
          </Link>
        </div>

        <div id="lpsection2div3">
          <Link to="/landing/applicationrequirements" id="nolink">
          <div id="lpsection2div1div1">
            <div id="lpsection2div1div1div1">
              <h3>Application Requirements</h3>
            </div>
            
          </div>
          </Link>
        </div>
        <div id="lpsection2div4">
          <Link to="/landing/successstories" id="nolink">
          <div id="lpsection2div1div1">
            <div id="lpsection2div1div1div1">
              <h3>Success Stories</h3>
            </div>
            
          </div>
          </Link>
        </div>
        
        
        
        
      </section>
    
    {/*=============================================*/} 
    
    <footer id="foooter">
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
