import React, { useState } from 'react';
import "../css/RegisterForm.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

//const APIURL="/api/auth/"; 

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {email, password}
        try {
            const res = await axios.post("/api/auth", user);
            localStorage.setItem("user", res.data.token);
            navigate('/page2');
            window.location.reload(true); 
        } catch (e) {
            console.log(e)
        }
        setEmail("");
        setPassword("")
    }



    return (
        <main className="RegisterForm">

            <form className="RegisterForm-form">
                <section className="RegisterForm-section">

                    <div className="RegisterForm-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                        />
                    </div>

                    <div className="RegisterForm-group">
                        <label htmlFor="password">Passwort</label>
                        <input
                            id="password"
                            type="text"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                        />
                    </div>

                </section>
                <button className="RegisterForm-button" onClick={handleLogin}>EINLOGGEN</button>

            </form>
        </main>
    )

}
export default LoginForm;