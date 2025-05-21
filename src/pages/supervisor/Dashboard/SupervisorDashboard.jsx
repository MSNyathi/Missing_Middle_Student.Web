import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../Login/Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function SupervisorDashboard(){
    return(
        <>
            <div className="App">
            <nav id="mynav">
                <Link to="/">
                <img id="myimg" src={tut25} classname="bcolor"/>
                </Link>
                <h1 id="myh1">EduConnect</h1>
                <Link to ="/" id="mylink">
                    <button id="btn"><i id="i" className="bi bi-person-circle" style={{ fontSize: '1.5rem' } }></i>Logout</button>
                </Link>
                
            </nav>
            
            </div>
        </>
    )
}
export default SupervisorDashboard;