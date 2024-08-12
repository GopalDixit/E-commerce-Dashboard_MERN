import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Signup = () => {
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
    try {
      const response = await axios.post('https://e-commerce-dashboard-mern-7.onrender.com/signup', { name, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      setName('');
      setPassword('');
      localStorage.setItem('user',JSON.stringify(response.data))
      localStorage.setItem('token',JSON.stringify(response.data.SecretToken))

        navigate('/')
      
    } catch (error) {
      console.error('Error making Axios request:', error.message);
      console.log('Full Axios response:', error.response); // Log the entire response object
    }

  };

  return (
    <div className='signupContainer'>
      <h1>Signup Page</h1>
      <input className='inputBox' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Username' />
      <input className='inputBox' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
      <button type='submit' onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Signup;
