import React, {useEffect, useState} from "react";
import DonorNavbar from "./donorNavbar";
import {v4 as uuidv4} from 'uuid';
import './DonationRequest.css';

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
        alert(`Request submitted!\nDonation ID: ${formData.donationID}`);

        setFormData({
            name: '',
            email: '',
            serial: generateID(),
            condition: '',
            pickupDate: '',
            notes: '',
        });
    }

    return(

        <div className="request-container">
            <DonorNavbar/>
            <h1>DONATION REQUEST</h1>
            <div className="request-form">
                <form onSubmit={handleSubmit} className="donation-form">
                    <label htmlFor="donationID">Donation ID: </label>
                    <input 
                        type="text" 
                        name="donationID"
                        value={formData.donationID} 
                        readOnly
                    />
                    <label htmlFor="NumberOfDevices">Number of Devices: </label>
                    <input 
                        type="number" 
                        name="devNum" required
                        onChange={handleChange}
                    />
                    <label htmlFor="pickUpDate">Pickup Date:</label>
                    <label htmlFor="notes">Notes</label>
                    <input 
                        type="date"
                        name="pickUpDate"
                        value={formData.pickUpDate}
                        onChange={handleChange}
                    />
                    <textarea
                        name="notes"
                        value={formData.notes}
                        rows={4}
                        cols={50}
                        onChange={handleChange}
                        required
                    />

                </form>
            </div>
        </div>
           
    );
} 