import React from 'react';
import tut25 from '../tut25.png';
import './Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';


function Login() {
    return (
        <>
            
            <div className="App">
            <nav id="mynav">
                <img id="myimg" src={tut25} classname="bcolor"/>
                <h1 id="myh1">EduConnect</h1>
                <button id="btn"><i id="i" className="bi bi-person-circle" style={{ fontSize: '1.5rem' } }></i>SWITCH USER</button>
            </nav>
            </div>
            <div id="mydiv">
            <i className="bi bi-person-circle" id="i1" style={{ fontSize: '4rem' }}></i>
                <h1 id="myh1">Student Login</h1>
                <p id="p1">Welcome back! Please enter your login details below.</p>
                <form>
                    <table>
                        <tr>
                            <td id="td1">
                                <label htmlFor="username">Username:</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="username" name="username" required />
                            </td>
                        </tr>
                        <tr>
                            <td id="td1">
                                <label htmlFor="password">Password:</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" id="password" name="password" required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/student">
                            <button type="submit" id="btn">Login</button>
                            </Link>
                            </td>
                        </tr>
                    </table>
                    
                </form>
                <p>Don't have an account? <Link to="/register">Sign up</Link></p>
            </div>
        </>
    )
}
export default Login;