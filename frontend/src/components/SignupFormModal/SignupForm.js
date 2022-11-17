import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

export default function SignUpForm({setShowModal}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState(''); 
    const [username, setUserName] = useState(''); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [validationErrors, setValidationErrors] = useState([]);

    if (sessionUser) {
        return (
            <Redirect to='/' />
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //check error here
        if (username.length < 4) return setValidationErrors(['Username must be 4 characters or more'])
        if (password.length < 6) return setValidationErrors(['Password must be 6 characters or more.'])
        if (password === confirmPassword) {
            setValidationErrors([]);
            return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
                .then(()=> setShowModal(false))
                    .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) {
                            let error = Object.values(data.errors)
                            setValidationErrors(error);
                        }
                    });
        }
        
        return setValidationErrors(['Confirm Password field must be the same as the Password field']);
    }
    
    return (
        <div className='signup-container'>
            <div className='signup-header'>
                <h2>Create An Account</h2>
                <p>It's quick and easy!</p>
            </div>
            <form onSubmit={handleSubmit} className='signup-form'>
                {
                    validationErrors.length > 0 &&
                    <ul>
                        {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                } 
                <div className='signup-field signup-info'>
                    <div className='signup-field signup-firstname'>
                        <label>
                            <input
                                type='text'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                placeholder='First Name'
                                className='input-field'
                            />
                        </label>
                    </div>
                    <div className='signup-field signup-lastname'>
                        <label>
                            <input
                                type='text'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                placeholder='Last Name'
                                className='input-field'
                            />
                        </label>
                    </div>
                    <div className='signup-field signup-username'>
                        <label>
                            <input
                                type='text'
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                placeholder='Username'
                                className='input-field'
                            />
                        </label>
                    </div>
                    <div className='signup-field signup-email'>
                        <label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='Email'
                                className='input-field'
                            />
                        </label>
                    </div>
                    <div className='signup-field signup-password'>
                        <label>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='Password'
                                className='input-field'
                            />
                        </label>
                    </div>
                    <div className='signup-field signup-confirmedPassword'>
                        <label>
                            <input
                                type='password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder='Confirmed Password'
                                className='input-field'
                            />
                        </label>
                    </div>
                    <div className='signup-btn'><button type='submit'>Sign Up</button></div>
                </div>        
            </form>
        </div>
    )
        
}
