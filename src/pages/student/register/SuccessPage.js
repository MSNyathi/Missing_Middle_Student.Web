import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./student.css";
import tut25 from "./tut25.png";

function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <div className="success-wrapper">
      <img id="myimg" src={tut25} alt="TUT Logo" style={{ height: "60px", marginBottom: "1rem" }} />
      <div className="success-modal">
        <h2 className="success-title">SUCCESS!!</h2>
        <p className="success-subtitle">Registration Complete</p>
        <button className="success-button" onClick={() => navigate("/student/login")}>
          DONE
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
