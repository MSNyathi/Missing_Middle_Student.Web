import React from 'react';
import { Link } from 'react-router-dom';
import tut25 from '../../assets/tut25.png'; // Adjust the path to your image
import '../../LandingPage2.css'; // Import your CSS file for styling

function ApplicationRequirements() {
  return (
    <>
    <nav id="mynavv">
      
      <Link to="/">
      <img id="myimg" src={tut25} classname="bcolor"/>
      </Link>
      <h1 id="myh1">EduConnect</h1>
      
    </nav>
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
    
    </>
  );
}export default ApplicationRequirements;