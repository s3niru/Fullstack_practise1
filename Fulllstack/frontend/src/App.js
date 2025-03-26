import React, { useState} from 'react'; 
import axios from 'axios';
import Formcomponent from './Formcomponent';
import Twitter from './twitter';
import { useNavigate, Link } from 'react-router-dom';


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

const register = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      setMessage('User registered successfully');
    } catch {
      setMessage('Error registering');
    }
  };

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setToken(res.data.token);
      setMessage('Logged in successfully');
    } catch {
      setMessage('Invalid credentials');
    }
  };
  const [showTwitter, setShowTwitter] = useState(false);
  const selectTwiiter = async () => {
    setShowTwitter(true)
  };
  const [showtube, setShowtube] = useState(false);
  const selecttube = async () => {
    setShowtube(true)
  };


  return (
  
    <div>
      <h1>Auth System</h1>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <p>{message}</p>
      <button onClick={selectTwiiter}>Twitter</button>
      <button onClick={selecttube}>Youtube</button>
      {showTwitter && token && <Twitter token={token} />}
      {showtube && token && <Formcomponent token={token} />}
      
    </div>
  );
}

export default App;
