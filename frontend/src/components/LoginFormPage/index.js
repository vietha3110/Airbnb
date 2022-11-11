import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux'; 
import { Redirect } from 'react-router-dom';
import './LoginForm.css';


export default function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );
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
        <form onSubmit={handleSubmit}>
            <h2>LOGIN</h2>
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
                    type='text'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type='submit'>Log in</button>
        </form>
    )
}
