import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/LoginPage.css'; 
import backgroundImage from '../img/road.jpg';
import './Profile.js';
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
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.success) {
                setIsLoggedIn(true);
                navigate('/profile');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    
      
    const handleRegistration = async () => {
    try {
        const response = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            setIsRegistered(true);
            //setIsLoggedIn(true);
            navigate("/login");
        } else {
            const errorMessage = await response.text();
            setRegistrationError(errorMessage);
        }
    } catch (error) {
        console.error(error);
        console.log("handleRegistration clicked");
        setRegistrationError("Registration failed. Please try again later.");
    }
    };
    
    // if (isLoggedIn) {
    //     navigate('/profile');
    // }

    return(
        <div>
            <Navbar/>
            <img src={backgroundImage} alt="Background" className="background-image" />
            <div className='container'>
                <div> 
                    {
                    !isRegistered?
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
                        <div className='register_link'>
                            Already registered? <button className="login" onClick={()=>setDisplay(false)}>Login</button>
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
                            {error && <div className="error">Error</div>}
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