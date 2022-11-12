import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux'; 
import './LoginForm.css';


export default function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        return dispatch(sessionActions.userLogin({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setValidationErrors(['Email/ Password is incorrect']);
                }
            })
    }
    
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <h2>Welcome to Hairbnb</h2>
                <ul>
                    {validationError.map(error =>
                        <li key={error}>{error}</li>)}
                </ul>
                <label>
                    Username or Email:
                    <input
                        type='text'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type='submit'>Log in</button>
            </form>
        </div>
    )
}
