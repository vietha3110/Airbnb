import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux'; 
import { Redirect } from 'react-router-dom';

import './LoginForm.css';


export default function LoginForm({setShowModal}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
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
            .then(setShowModal(false))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setValidationErrors(['Email/ Password is incorrect']);
                }
            })
    }
    
    return (
        <div className='login-container'>
            <div className='login-header'>
                <h2>Log in</h2>
            </div>
            <form onSubmit={handleSubmit} className='login-form'>   
                <div className='login-welcome'>
                    <h3>Welcome to Hairbnb</h3>
                </div>
                
                {validationError.length > 0 &&
                    <ul>
                        {validationError.map(error =>
                            <li key={error}>{error}</li>)}
                    </ul>
                }
                
                <div className='login-info'>
                    <div className='login-name'>
                        <label>
                            <input
                                type='text'
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                required
                                placeholder='username/email'
                                class='login-input login-input-email'
                            />
                        </label>
                    </div>
                    <div className='login-password'>
                        <label>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='password '
                                class='login-input'
                            />
                        </label>
                    </div>
                </div>
                <div className='login-button'>
                    <button className='login-btn' type='submit'>Log in</button>
                </div>
            </form>
        </div>
    )
}
