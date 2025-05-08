import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './student.css';

function RegisterForm() {

    const [formData, setFormData] = useState({
        studentNumber: '',
        surname: '',
        initials: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword:''

    });

    const [errors,setErrors] = useState({});

    const validate = () =>{
        const newError ={};

        if(!/^\d{9}$/.test(formData.studentNumber)){
            newError.studentNumber = "Student Number should be 9 digits long";
        }
        if(!formData.surname.trim()) newError.surname = "Surname is required";
        if(!formData.initials.trim()) newError.surname = "Initials are required";
        if(!/\S+@\S+\.\S+/.test(formData.email)){
            newError.email = "Enter a valid email address";
        }
        if(!/^\d{10}$/.test(formData.phone)){
            newError.phone = "Phone number must be 10 digits long";
        }
        
        const password =formData.password;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        if(!password){
            newError.password="Password is required";

        }else if(!passwordRegex.test(password)){
            newError.password ="Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character.";

        }

        if(!formData.confirmPassword){
            newError.confirmPassword = "Please confirm password";
        }else if(formData.password !== formData.confirmPassword){
            newError.confirmPassword = "Passwords do not match";
        }

        setErrors(newError);
        return Object.keys(newError).length===0;

    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        if(validate()){
            navigate('/success');
        }
    }

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    return (
        <div className="register-container">
            <h2>Register</h2>
            <p>Please enter the details below</p>
            <form  className='register-form' onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="studentNumber">Student Number:</label>
                    <input type="text"  
                           name="studentNumber"
                           value = {formData.studentNumber}
                           onChange={handleChange}
                    />
                    {errors.studentNumber && <span>{errors.studentNumber}</span>}
                </div>
                <div>
                    <label htmlFor="Surname">Surname:</label>
                    <input type="text" 
                           name="surname"
                           value={formData.surname}
                           onChange={handleChange} 
                    />
                    {errors.surname && <span>{errors.surname}</span>}
                </div>
                <div>
                    <label htmlFor="Initials">Initials:</label>
                    <input type="text" 
                           name="initials"
                           value={formData.initials}
                           onChange={handleChange} 
                    />
                    {errors.initials && <span>{errors.initials}</span>}
                </div>
                <div>
                    <label htmlFor="Email">Email:</label>
                    <input type="email" 
                           name="email"
                           value={formData.email}
                           onChange={handleChange} 
                    />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="Phone">Phone:</label>
                    <input type="text" 
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                    />
                    {errors.phone && <span>{errors.phone}</span>}
                </div>
                <div>
                    <label htmlFor="Password">Password:</label>
                    <input type="password" 
                           name="password"
                           value={formData.password}
                           onChange={handleChange}
                    />
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <div>
                    <label htmlFor="Password">Confirm Password:</label>
                    <input type="password" 
                           name="confirmPassword"
                           value={formData.confirmPassword}
                           onChange={handleChange}
                    />
                    {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className="buttons">
                    <button type="submit" className="cancel-btn" onClick={() => navigate('/login')} >Cancel</button>
                    <button type="submit" className="next-btn"  >Register</button>
                </div>

            </form>
        </div>
    );

}
export default RegisterForm;