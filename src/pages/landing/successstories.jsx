import React from 'react';
import { Link } from 'react-router-dom';
import tut25 from '../../assets/tut25.png'; // Adjust the path to your image
import '../../LandingPage2.css'; // Import your CSS file for styling

function SuccessStories() {
  return (
    <>
    <section id="ss">
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
    
    
    <div id="ssdiv1">
      <h3 id="myh1">Success Stories</h3>
      <p class="italic">"This system helped us coordinate thousands of donations to students in need!"</p>
        <p class="mt-2 font-medium">– A Grateful Donor</p>
        <br />
        <p class="italic">"Managing student repairs and device handouts has never been easier."</p>
        <p class="mt-2 font-medium">– Lead Technician</p>
      
    </div>
  </section>
    
    </>
    
  );
}export default SuccessStories;