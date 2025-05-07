import React from 'react';
import tut25 from '../tut25.png';
import '../index.css';


function Login() {
    return (
        <>
            <div className="App">
            <nav>
                <img src={tut25} classname="bcolor"/>
                <h1>EduConnect</h1>
                <button>LOGIN</button>
            </nav>
            </div>
            <div id="mydiv">
                <h1>Student Login</h1>
                <p>Welcome back! Please enter your credentials to log in.</p>
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
                                <button type="submit">Login</button>
                            </td>
                        </tr>
                    </table>
                </form>
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </>
    )
}
export default Login;