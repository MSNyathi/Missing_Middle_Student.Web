import React, {useEffect, useState} from "react";
import DonorNavbar from "./donorNavbar";
import './DonationRequest.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DonationRequest(){

    const generateID = () =>{
        return  Math.floor(100000 + Math.random() * 900000);
    }
    const [formData,setFormData] = useState({
        donationID:'',
        devNum:'',
        notes:'',
        pickUpDate: ''
    });

    useEffect(()=>{
        setFormData(prev=>({
            ...prev, donationID: generateID()
        }))
    },[]);

    const handleChange=(e)=>{
        setFormData(prev =>({
            ...prev,[e.target.name]:e.target.value
        }));
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('Submitted:', formData);
        
        const confirmed = window.confirm("Are you sure?");
        if(!confirmed)return;

        setFormData({
            numDev: '',
            pickupDate: '',
            notes: '',
        });
    }

    return(
        <div className="request-container">
        <DonorNavbar/>

        <main className="main-contents">
            <div className="main-heading"><h1><b>DONATION REQUEST</b></h1></div>   
            
            <div className="request-form">
                <form onSubmit={handleSubmit} className="donation-form">
                    <label htmlFor="NumberOfDevices">Number of Devices: </label>
                    <input 
                        type="number" 
                        name="devNum" required
                        onChange={handleChange}
                    />
                    <label htmlFor="pickUpDate">Pickup Date:</label>
                    
                    <input 
                        type="date"
                        name="pickUpDate"
                        value={formData.pickUpDate}
                        onChange={handleChange}
                    />
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        rows={4}
                        cols={50}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Submit Request</button>
                </form>
            </div>
        </main>
       </div>    
    );
} 