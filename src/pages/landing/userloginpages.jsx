import React from 'react';
import { Link } from 'react-router-dom';
import tut25 from '../../assets/tut25.png'; // Adjust the path to your image
import '../../LandingPage2.css'; // Import your CSS file for styling

function UserLoginPages() {
  return (
    <>
    <nav id="mynavv">
      
      <Link to="/">
      <img id="myimg" src={tut25} classname="bcolor"/>
      </Link>
      <h1 id="myh1">EduConnect</h1>
      
    </nav>
    <div className="user-login-pages">
      <h1>User Login Pages</h1>
      {/* Add your login form or components here */}
      <section id="landingsection2" class="py-12 px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
    <h2 id="p1">Welcome</h2>
    <p id="p1" class="max-w-2xl mx-auto text-lg">Serving Donors, Supervisors, Admins, Students, and Technicians to streamline collaboration and support.</p>
    <nav id="">

      <Link to="donor/login">
      <p id="landingsection1li" class="mt-2 font-medium">🎁Donor</p>
      </Link>
      <Link to="/Supervisor/Login">
        <p id="landingsection1li" class="mt-2 font-medium">🧑‍🏫Supervisor</p>
      </Link>
      <Link to="/admin/login">
        <p id="landingsection1li" class="mt-2 font-medium">🛡️Admin</p>
      </Link>
      <Link to="/student/login" id="mylink">
        <p id="landingsection1li" class="mt-2 font-medium">🎓Student</p>
      </Link>
      <Link to="/admin/login">
      <p id="landingsection1li" class="mt-2 font-medium">🛠️Technician</p>
      </Link>
    </nav>

  </section>
    </div>
    </>
  );
}export default UserLoginPages;