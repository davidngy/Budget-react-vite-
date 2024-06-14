import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        try
        {
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();
            const response = await axios.post('http://localhost:3001/api/auth/register', {
                email: trimmedEmail, 
                password: trimmedPassword
            });
            alert('registered')
            console.log(response)
            navigate('/login');
        }
        catch (error)
        {
            console.error(error.response)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen"> {/* Zentriert das Formular vertikal und horizontal auf dem Bildschirm */}
            <form onSubmit={handleSubmit} className="w-full max-w-md p- bg-white shadow-lg rounded-lg"> {/* Setzt eine maximale Breite und wendet Padding sowie Hintergrundfarbe an */}
                <label className="input input-bordered flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /></svg>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='grow'
                        type="text" />
                </label>
        
                <label className="input input-bordered flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='grow'
                        type="password" />
                </label>
        
                <button type='submit' className="w-full btn btn-primary">Register</button>
            </form>
        </div>
    
    )
}

export default Register