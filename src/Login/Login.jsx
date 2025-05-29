import React from "react";
import tut25 from "../assets/tut25.png"; // Adjust the path to your image
import "./Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import LoginNavbar from "../commponents/loginNavbar";

function Login() {
  return (
    <>
      <LoginNavbar />

      <div id="mydiv">
        <i
          className="bi bi-person-circle"
          id="i1"
          style={{ fontSize: "4rem" }}
        ></i>
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
                <input
                  type="email"
                  id="input1"
                  name="username"
                  pattern="^[0-9]{9}@tut4life\.ac\.za$"
                  title="Username must be a 9-digit student number followed by @tut4life.ac.za"
                  required
                />
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
              <Link to="/student">
                <button type="submit" id="btn2">
                  Login
                </button>
              </Link>
            </tr>
          </table>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
