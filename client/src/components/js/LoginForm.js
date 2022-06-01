import React, { useState } from 'react';
import '../css/RegisterForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { email, password };
    if (email && password) {
      try {
        const res = await axios.post('/api/auth', user);
        localStorage.setItem('user', res.data.token);
        navigate('/page2');
        window.location.reload(true);
        setMsg('');
        setEmail('');
        setPassword('');
      } catch (e) {
        setMsg('Falsche Anmeldeinformationen...');
        console.log(e);
      }
    } else {
      setMsg('Bitte stell dich sicher, dass beide Felder ausgefüllt sind...');
    }
  };

  return (
    <main className='RegisterForm'>
      <form className='RegisterForm-form'>
        <section className='RegisterForm-section'>
          <div className='RegisterForm-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='text'
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (password) {
                  setMsg('');
                }
              }}
              name='email'
            />
          </div>

          <div className='RegisterForm-group'>
            <label htmlFor='password'>Passwort</label>
            <input
              id='password'
              type='text'
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (email) {
                  setMsg('');
                }
              }}
              name='password'
            />
          </div>
        </section>
        <button className='RegisterForm-button mt-3' onClick={handleLogin}>
          EINLOGGEN
        </button>
        {msg && <div className=' message m-3 text-danger'>{msg}</div>}
      </form>
    </main>
  );
};
export default LoginForm;
