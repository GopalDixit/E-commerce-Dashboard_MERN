import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'


const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
          navigate('/')
        }
      })
      const handleClick = async () => {
        console.log(name, password);
        try {
            let result = await fetch('http://localhost:5600/login', {
                method: 'post',
                body: JSON.stringify({ name, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!result.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await result.json();
            console.log(data);
    
            if (data.SecretToken) {
                localStorage.setItem('user', JSON.stringify(data.userdata));
                localStorage.setItem('token', JSON.stringify(data.SecretToken));

                navigate('/');
            } else {
                alert("Please enter correct details");
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert("An error occurred during login. Please try again.");
        }
    };
    

  return (
    <div className='loginContainer'>
        <h1>Login Page</h1>
      <input className='inputBox' type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Username' />
      <input className='inputBox' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
      <button onClick={handleClick} type='submit'>Login</button>
    </div>
  )
}

export default Login
