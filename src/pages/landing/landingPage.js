import React, { useState } from "react";
import "./landingPage.css";
import BgImg from "./logo2.png";
import StuImg from "./element.jpeg";
import DonImg from "./6144.jpg";
import { Link } from "react-router-dom";


export default function LandingPage() {
  
  return (
    <div style={{background:'white'}}>
      <nav>
        <div class="logo">
          <img src={BgImg} alt="logo" height="50px" width="180px" />
        </div>
        <div class="dropMenuDiv" style={{color: 'black' }}>
          <button class="dropMenuBtn">LOGIN</button>
          <div class="dropdownContent">
            <a href="/student/login">Student</a>
            <a href="/admin/login">Staff</a>
            <a href="/donor/login">Donator</a>
            <a href="/supervisor/login">Supervisor</a>
          </div>
        </div>
      </nav>

      <section class="hero" style={{ color: 'black' }}>
        <div id="herodiv">
          <h1>EMPOWERING STUDENTS. ONE LAPTOP AT A TIME.</h1>
          <p>
            Bridging the digital divide for TUT’s Missing Middle through
            refurbished technology and community support.
          </p>
          <div class="buttons">
            <Link to="/student/login">
              <button class="btn-primary" >Apply Now</button>
            </Link>
            <Link to="donor/login">
              <button class="btn-secondary">Donate</button>
            </Link>
            <Link to="">
              <button class="btn-outline">Learn More</button>
            </Link>
            
          </div>
        </div>
      </section>
      <section style={{background:'white',color: 'black' }}>
        <h2 class="section-title" style={{ marginBottom: 0 }}>WHAT IS THE EDUCONNECT SYSTEM?</h2>
        <p class="section-text">
          EduConnect a multi-user platform to manage and streamline the
          donation, refurbishment, and allocation of laptops to financially
          vulnerable students at TUT. We primarily target students classified as
          "missing middle". These are students with a combined annual household
          income of R350 000 - R600 000. The criteria on National Groups must
          comply with 80% for Africans followed by coloured then Indians.
        </p>
      </section>

      <section style={{background:'white',color: 'black' }}>
        <h2 class="section-title">APPLICATION REQUIREMENTS</h2>
        <p class="section-text">➡️ You must be a registered TUT student.</p>
        <p class="section-text">➡️ You must be under any TUT STEM course.</p>
        <p class="section-text">➡️ You must be a South African Citizen.</p>
        <p class="section-text">➡️ You must not be funded by NSFAS.</p>
        <p class="section-text">
          ➡️ You must be either doing your Diploma or be a first year as an
          Advanced Diploma STEM student.{" "}
        </p>
        <p class="section-text">➡️ You must have an academic average of 60%.</p>
        <p class="section-text">
          ➡️ You must submit the latest Statement of income and expnditure.
        </p>
      </section>
      <section style={{ backgroundColor: 'whitesmoke', marginBottom: 0, color:'black' }}>
        <h2 class="section-title" style={{ color: "#c92426" }}>
          HOW TO APPLY - FOR STUDENTS
        </h2>
        <p class="section-text">
          Follow these quick and easy steps to apply for a laptop. Please note
          preference will exclusively be given to qualifying students. To view
          requirements please click <a href="#">here</a>
        </p>
        <div class="imgCard">
          <div class="allCard">
            <div class="card">
              <div class="custom-card" style={{ backgroundColor: "#2aa9e2", color: 'black' }}>
                <h3>STEP 1</h3>
                <p>
                  <b>Log in using your student credentials</b>
                </p>
              </div>
            </div>
            <div class="card">
              <div class="custom-card" style={{ backgroundColor: "#b46e0b", color: 'black' }}>
                <h3>STEP 2</h3>
                <p>
                  <b>Navigate to the Apply For Laptop button</b>
                </p>
              </div>
            </div>
            <div class="card">
              <div class="custom-card" style={{ backgroundColor: "#d52235", color: 'black' }}>
                <h3>STEP 3</h3>
                <p>
                  <b>Upload Proof of Income</b>
                </p>
              </div>
            </div>
            <div class="card">
              <div class="custom-card" style={{ backgroundColor: "#2aa9e2", color: 'black' }}>
                <h3>STEP 4</h3>
                <p>
                  <b>If you have one, upload recommendation letter</b>
                </p>
              </div>
            </div>
            <div class="card">
              <div class="custom-card" style={{ backgroundColor: "#b46e0b", color: 'black' }}>
                <h3>STEP 5</h3>
                <p>
                  <b>Track your application in real-time</b>
                </p>
              </div>
            </div>
          </div>
          <img src={StuImg} alt="Image" height="750px" width="900px" />
        </div>

        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Link to="/student/login">
            <button class="Btn">Apply Now</button>
          </Link>
          
        </div>
      </section>
      <section style={{ background: 'white',color: 'black' }}>
        <h2 class="section-title">HOW TO DONATE - FOR EXTERNAL DONORS</h2>
        <div class="imgCard">
          <img src={DonImg} alt="Image" height="850px" width="680px" />
          <div class="allCard">
            <div class="card">
              <div class="custom-card" style={{ backgroundColor: "#2aa9e2" }}>
                <h3>STEP 1</h3>
                <p>
                  <b>Click on the “Donate” button</b>
                </p>
              </div>
            </div>
            <div class="card">
              <div class="custom-card" style={{ backgroundColor: "#d52235" }}>
                <h3>STEP 2</h3>
                <p>
                  <b>Choose your donation type</b>
                </p>
              </div>
            </div>
            <div class="card">
              <div class="custom-card" style={{ backgroundColor: "#2aa9e2" }}>
                <h3>STEP 3</h3>
                <p>
                  <b>Fill in the donation form</b>
                </p>
              </div>
            </div>
            <div class="card">
              <div class="custom-card" style={{ backgroundColor: "#d52235" }}>
                <h3>STEP 4</h3>
                <p>
                  <b>Receive confirmation and a digital tax receipt</b>
                </p>
              </div>
            </div>
            <div class="card">
              <div class="custom-card" style={{ backgroundColor: "#2aa9e2" }}>
                <h3>STEP 5</h3>
                <p>
                  <b>Track your donation impact via your dashboard</b>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Link to="donor/login">
            <button class="Btn">Donate Now</button>
          </Link>
          
        </div>
      </section>
      <section style={{background:'white',color: 'black' }}>
        <h2 class="section-title">MEET THE DEVELOPMENT TEAM</h2>
        <div class="section-text">
          <p>
            {" "}
            The team comprises of perspective graduates from the Tshwane
            University of Technicology who have gone through extensive industry
            training through the Informatics Community Engagment Program
            (I.C.E.P). Our team is skilled in the following professions{" "}
          </p>
          <ul>
            <li>
              <strong>Scrum Master</strong>
            </li>
            <li>
              <strong>Business Analyst</strong>
            </li>
            <li>
              <strong>Developers</strong>
            </li>
            <li>
              <strong>Front Developers</strong>
            </li>
            <li>
              <strong>Back Developers</strong>
            </li>
          </ul>
        </div>
      </section>
      <footer style={{ background: '#2e2e2e', color: 'white', textAlign: 'center', padding: '30px' }}>
        <p>📍 TUT Community Engagement | Pretoria Campus</p>
        <p>📧 laptopproject@tut.ac.za | 📱 WhatsApp: 012 XXX XXXX</p>
        <div style={{ marginTop: '10px' }}>
          <a
            href="#"
            style={{color: '#fff', margin: '0 10px', textDecoration: 'underline'}}
          >
            Terms
          </a>
          <a
            href="#"
            style={{color: '#fff', margin: '0 10px', textDecoration: 'underline'}}
          >
            Privacy
          </a>
          <a
            href="#"
            style={{color: '#fff', margin: '0 10px', textDecoration: 'underline'}}
          >
            FAQs
          </a>
          <a
            href="#"
            style={{color: '#fff', margin: '0 10px', textDecoration: 'underline'}}
          >
            Staff Login
          </a>
        </div>
      </footer>
    </div>
  );
}
