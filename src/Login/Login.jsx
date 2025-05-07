import React from 'react';
import tut25 from '../tut25.png';
import './Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Login() {
    return (
        <>
            <div className="App">
            <nav>
                <img src={tut25} classname="bcolor"/>
                <h1>EduConnect</h1>
                <button id="btn"><i id="i" className="bi bi-person-circle" style={{ fontSize: '1.5rem' } }></i>SWITCH USER</button>
            </nav>
            </div>
            <div id="mydiv">
            <i className="bi bi-person-circle" style={{ fontSize: '3rem' }}></i>
                <h1>Student Login</h1>
                <p>Welcome back! Please enter your login details below.</p>
                <form>
                    <table>
                        <tr>
                            <td>
                                <label htmlFor="username">Username:</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="username" name="username" required />
                            </td>
                        </tr>
                        <tr>
                            <td>
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
                            <button type="submit" id="btn2">Login</button>
                            </td>
                        </tr>
                    </table>
                    
                </form>
                <p>Don't have an account? <a href="/Register.jsx">Sign up</a></p>
            </div>
        </>
    )
}
export default Login;