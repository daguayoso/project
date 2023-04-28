import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/LoginPage.css'; 
import backgroundImage from '../img/road.jpg';
import axios from 'axios';
import Navbar from "./Navbar";
function LoginPage(){

    const [display,setDisplay]=useState(false);
    const [show,setShow]=useState(false);
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [isRegistered,setIsRegistered]=useState(false);
    const [registrationError, setRegistrationError] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    const navigate = useNavigate();

    const handleShow=()=>{
        setShow(!show);
    }

    const handleRegister = ()=>{
        setIsRegistered(true);
    }

    const handleLogin = async () => {
        const response = await axios.get( `http://localhost:4000/login/${username}/${password}`); 
        if (response.data.success){
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            navigate(
                '/profile',
                );
        }

        else{
            window.location.reload();
        }
      
    };

    
      
    const handleRegistration = async () => {
        console.log(username)
        console.log(password)
        
        const response = await axios.post('http://localhost:4000/login/register',
        {
            "username": username,
            "password": password
        }
        )

        window.location.reload();
    };
    
    // if (isLoggedIn) {
    //     navigate('/profile');
    // }

    return(
        <div>
            <img src={backgroundImage} alt="Background" className="background-image" />
            <div className='container'>
                <div> 
                    {
                    display?
                    <div>
                    <h1 className='title'>Sign Up</h1>
                    <div>
                        <div className='field_container'>
                            <input placeholder='Username' className='otherField' onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className='field_container'>
                        <input placeholder='Password' type={show?"text":"password"} className='otherField' onChange={(e)=>setPassword(e.target.value)}/>
                        {/* <label onClick={handleShow}>{show?"Hide":"Show"}</label> */}
                        </div>
                        <button className='login' onClick={handleRegistration}>Register</button>
                        {registrationError && <div className="error">Registration Error</div>}
                    </div>
                    <div className='login_link'>
                        Already registered? <button className='goToLogin' onClick={()=>setDisplay(false)}>Login</button>
                    </div>
                </div>:
                <div>
                    <h1 className='title'>Login</h1>
                    <div>
                        <div className='field_container'>
                            <input placeholder='Username' className='otherField' onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className='field_container'>
                        <input placeholder='Password' type={show?"text":"password"} className='otherField' onChange={(e)=>setPassword(e.target.value)}/>
                        {/* <label onClick={handleShow}>{show?"Hide":"Show"}</label> */}
                        </div>
                        <button className='login' onClick={handleLogin}>Login</button>
                        {error && <div className="error">Wrong username or password</div>}
                    </div>
                    <div className='register_link'>
                        Don't have an account? <button classname='register' onClick={()=>setDisplay(true)}>Register</button>
                    </div>
                </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
