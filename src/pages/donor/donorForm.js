import React,{useState} from 'react';
import './donorForm.css'
import { useNavigate } from 'react-router-dom';

export default function DonorForm(){

    const navigate = useNavigate();

    const [formData ,setFormData] = useState({
        staffNum:'',
        devNum:'',
        pickUpDate:'',
        notes:''

    });
    const handleChange = (e)=>{
        setFormData({...formData,[e.targey.name]:e.target.value});
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
    }

    return(

        <div className='form-container'>
            <h2>DONATION REQUEST</h2>
            <form onSubmit={handleSubmit}>
                <div className='main-form'>
                    
                        <label htmlFor='staffNum'>Staff number: </label>
                        <input
                           type='text'
                            name='staffNum'
                            onChange={handleChange}
                            required
                        />
                       <label htmlFor='devNum'>Number Of Devices: </label>
                        <input
                            type='number'
                            name='devNum'
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor='pickUpDate'>Pick Up Date: </label>
                        <input
                            type='date'
                            name='pickUpDate'
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor='notes'>Notes: </label>
                        <textarea
                            type='text'
                            name='notes'
                            rows={5}
                            cols={20}
                            onChange={handleChange}
                            required
                        />                        
                    <div className='btn-item'>
                        <button type='submit' className='cancel-btn' onClick={()=> navigate('/')}>CANCEL</button>
                        <button type='submit' className='submit-btn'>SUBMIT</button>
                    </div>
                    
                </div>
            </form>
            
        </div>
    );
}