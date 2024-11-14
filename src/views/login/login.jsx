// src/views/Login.jsx
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("User or Password wrong");
    }
  };

  return (
    <div className="Auth">
      <h2>SING IN</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Sing in</button>
      {error && <p className="error">{error}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sing up</Link>
      </p>
    </div>
  );
}

export default Login;
