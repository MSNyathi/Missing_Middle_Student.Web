import React from 'react';
import tut25 from '../../../assets/logo2.png';
import '../../../landingPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';


function SupervisorLogin() {
    return (
        <>
            
            <div className="App">
            <nav id="mynavv">
                <Link to="/">
                <img id="myimg" src={tut25} classname="bcolor"/>
                </Link>
                <h1 id="myh1">EduConnect</h1>
                <Link to ="/adminlogin" id="mylink">
                    <button id="btn"><i id="i" className="bi bi-person-circle" style={{ fontSize: '1.5rem' } }></i>SWITCH USER</button>
                </Link>
                
            </nav>
            
            </div>
            <div id="mydiv">
            <i className="bi bi-person-circle" id="i1" style={{ fontSize: '4rem' }}></i>
                <h1 id="myh1">Welcome, Supervisor</h1>
                <p id="p1">Please enter your login details below.</p>

                <form id="myform1">
                    <table id="tbl">
                        <tr>
                            <td id="td1">
                                <label htmlFor="username">Username:</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="input1" name="username" required />
                            </td>
                        </tr>
                        <tr>
                            <td id="td1">
                                <label htmlFor="password">Password:</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" id="input1" name="password" required />
                            </td>
                        </tr>
                        <tr id="trbtn">
                        <Link to="/supervisor/dashboard" id="mylink">
                            <button type="submit" id="btn" className="">LOGIN</button>
                            </Link>
                            
                        </tr>
                    </table>
                    
                </form>
                
            </div>
            <div id="simp">
                <h2 id="myh1">Leading the way, Together.</h2>
            </div>
        </>
    )
}
export default SupervisorLogin;