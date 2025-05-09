import tut25 from './tut25.png';
import './App.css';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
    <nav id="mynav">
      <Link to="/">
      <img id="myimg" src={tut25} classname="bcolor"/>
      </Link>
      <h1 id="myh1">Welcome to EduConnect</h1>
      <Link to="/login">
      <button id="btn"><i id="i" className="bi bi-person-circle" style={{ fontSize: '1.5rem' } }></i>SIGN IN</button>
      </Link>
      </nav>
    <div className="text-center p-5">
      
      
      <div id="mydiv">
      <h2 id="myh1">Empowering Students Through Technology</h2>
      <p id="p1">In today's digital age, access to technology is essential for academic success. </p>
        <p id="p1">Recognizing this need, our initiative is dedicated to providing refurbished laptops to deserving students within Tshwane University of Technology. </p>
        <p id="p1">By donating your old or unused laptops, you can help bridge the digital divide and empower the next generation of leaders</p>
        </div>
    </div>
    </>
  );
}

export default App;
