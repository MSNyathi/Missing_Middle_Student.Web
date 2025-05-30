import React from 'react';
import { Link } from 'react-router-dom';
import tut25 from '../../assets/tut25.png'; // Adjust the path to your image
import '../../LandingPage2.css'; // Import your CSS file for styling

function Announcements() {
  return (
    <>
    <section id="announcements">
    <nav id="mynavv">
      
      <Link to="/">
      <img id="myimg" src={tut25} classname="bcolor"/>
      </Link>
      <h1 id="myh1">EduConnect</h1>
      
    </nav>
    <button
      onClick={() => window.history.back()}
      className="back-button"
      style={{ margin: '16px', padding: '8px 16px', cursor: 'pointer' }}
    >
      ← Back
    </button>
    <div >
      <section id="landingsection2" >
      <h1 id="myh1">Announcements</h1>
      <p id="p1">No announcements at this time.</p>
      </section>
    </div>
    </section>
    
    </>
  );
}export default Announcements;