import React from 'react';
import tut25 from '../../assets/logo2.png';
import '../../Login/Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function Announcements() {
    return (
        <>
            <div className="App">
                <nav id="mynav">
                    <Link to="/">
                        <img id="myimg" src={tut25} className="bcolor" alt="Logo" />
                    </Link>
                    <h1 id="myh1">EduConnect</h1>
                    
                </nav>
            </div>
            <div id="mydiv">
                <h1 id="myh1">Announcements</h1>
                <p id="p1">Stay updated with the latest announcements and news related to the laptop donation program.</p>
                {/* Add your announcements content here */}
            </div>
            <Link to="/">
                <button id="btn">Back</button>
            </Link>
        </>
    );
}
export default Announcements;