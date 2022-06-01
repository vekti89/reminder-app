import React, { useState } from 'react';
import '../css/RegisterForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//const APIURL="/api/users/";

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      const newUser = { name, email, password };
      try {
        const res = await axios.post('/api/users', newUser);
        localStorage.setItem('user', res.data.token);
        navigate('/page2');
        window.location.reload(true);
        setName('');
        setEmail('');
        setPassword('');
        setMsg('');
      } catch (e) {
        setMsg('Registrierungsfehler... Bitte versuche es erneut.');
        console.log(e);
      }
    } else {
      setMsg('Bitte stell dich sicher, dass alle Felder ausgefüllt sind...');
    }
  };

  return (
    <main className='RegisterForm'>
      <form className='RegisterForm-form'>
        <section className='RegisterForm-section'>
          <div className='RegisterForm-group'>
            <label htmlFor='name'>Name</label>

            <input
              id='name'
              type='string'
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (email && password) {
                  setMsg('');
                }
              }}
              name='name'
            />
          </div>

          <div className='RegisterForm-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='text'
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (name && password) {
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
                if (name && email) {
                  setMsg('');
                }
              }}
              name='password'
            />
          </div>
        </section>
        <button className='RegisterForm-button mt-3' onClick={handleRegister}>
          REGISTRIEREN
        </button>
        {msg && <div className=' message m-3 text-danger'>{msg}</div>}
      </form>
    </main>
  );
};

export default RegisterForm;
