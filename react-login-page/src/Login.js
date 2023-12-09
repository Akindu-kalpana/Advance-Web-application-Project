// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      });

      console.log('Login successful:', response.data);
      // Handle successful login, e.g., store token in local storage, redirect, etc.
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Handle login failure, e.g., display an error message
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
