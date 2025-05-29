import React,{useState} from 'react';
//import tut25 from '../tut25.png';
import './Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link , useNavigate} from 'react-router-dom';


function AdminLogin() {
    
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRoleChange = (e)=>{
        setRole(e.target.value);
    }

    const  handleLogin = (e)=>{
        e.preventDefault();
        if(role==='admin'){
            navigate('/admin/dashboard');
        }else if(role==='technician'){
            navigate('/technician/dashboard');
        }else{
            alert('Please select a role');
        }

    }

    return (
        <>
            
            <div className="App">
            <nav id="mynav">
                {/*
                <Link to="/">
                    <img id="myimg" src={tut25} classname="bcolor"/>
                </Link>
                */}
                
                <h1 id="myh1">EduConnect</h1>
                <Link to="/login">
                    <button id="btn"><i id="i" className="bi bi-person-circle" style={{ fontSize: '1.5rem' } }></i>SWITCH USER</button>
                </Link>
                
            </nav>
            </div>
            <div id="mydiv">
            <i className="bi bi-person-circle" id="i1" style={{ fontSize: '4rem' }}></i>
                <h1 id="myh1">Staff Login</h1>
                <p id="p1">Welcome back! Please enter your login details below.</p>
                <form onSubmit={handleLogin}>
                    <table>
                        <tr>
                            <td id = "td00">
                                <label htmlFor='role'>Role: </label>

                                <label><input type='radio' name='role' value='admin' onChange={handleRoleChange}/>Admin</label>
                                <label><input type='radio' name='role' value='technician' onChange={handleRoleChange}/>Technician</label>
                            </td>
                        </tr>
                        <tr>
                            <td id="td1">
                                <label htmlFor="username">Username:</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="username" name="username"  />
                            </td>
                        </tr>
                        <tr>
                            <td id="td1">
                                <label htmlFor="password">Password:</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" id="password" name="password"  />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                
                            <button type="submit" id="btn">Login</button>
                            
                            </td>
                        </tr>
                    </table>
                    
                </form>
                
            </div>
            
        </>
        
    )
}
export default AdminLogin;