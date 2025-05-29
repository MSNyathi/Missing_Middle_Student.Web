import React from 'react';
import { Link } from 'react-router-dom';
import tut25 from '../../assets/tut25.png'; // Adjust the path to your image
import '../../LandingPage2.css'; // Import your CSS file for styling

function Announcements() {
  return (
    <>
    <nav id="mynavv">
      
      <Link to="/">
      <img id="myimg" src={tut25} classname="bcolor"/>
      </Link>
      <h1 id="myh1">EduConnect</h1>
      
    </nav>
    <section id="landingsection1">
    <div >
      <h1 className="text-4xl font-bold mb-4">Announcements</h1>
      <p className="text-lg text-gray-700">No announcements at this time.</p>
    </div>
    </section>
    </>
  );
}export default Announcements;