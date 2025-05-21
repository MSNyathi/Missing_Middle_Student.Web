import React, {useState} from "react";
import DonorNavbar from "./donorNavbar";

export default function DonationRequest(){

    const [formData,setFormData] = useState(
        
    );
    return(

        <div className="request-container">
            <DonorNavbar/>
            <h1>DONATION REQUEST</h1>
            <div className="request-form">
                <form className="donnation-form">
                    
                </form>
            </div>
        </div>
           
    );
} 