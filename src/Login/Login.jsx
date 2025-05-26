import React from 'react';
import tut25 from '../assets/tut25.png'; // Adjust the path to your image
import './Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import LoginNavbar from '../commponents/loginNavbar';


function Login() {
    return (
        <>
            <LoginNavbar />
           
            <div id="mydiv">
            <i className="bi bi-person-circle" id="i1" style={{ fontSize: '4rem' }}></i>
                <h1 id="myh1">Student Login</h1>
                <p id="p1">Welcome back! Please enter your login details below.</p>

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
                        <Link to="/student" id="mylink">
                            <button type="submit" id="btn" className="">LOGIN</button>
                            </Link>
                            
                        </tr>
                    </table>
                    
                </form>
                <div>
                    <Link to="/admin/forgot-password" id="mylink">
                    <p id="p1" className="fp">Forgot Password?</p>
                    </Link>
                    <p id="p1">Don't have an account?  <Link to="/register" id="mylink" className="fp">Sign up</Link></p>
                </div>
                
            </div>
            <div id="simp">
                <h2 id="myh1">Simplify Your Learning Journey</h2>
            </div>
        </>
    )
}
export default Login;