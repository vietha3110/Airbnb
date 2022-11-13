import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

export default function SignUpForm() {
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

        if (password === confirmPassword) {
            setValidationErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                    .catch(async (res) => {
                            const data = await res.json();
                            if (data && data.errors) setValidationErrors(data.errors);
                    });
        }
        
        return setValidationErrors(['Confirm Password field must be the same as the Password field']);
    }
    



    return (
        <div>
            <h2>Sign Up</h2>
            <p>It's quick and easy</p>
            <form onSubmit={handleSubmit}>
                <ul>
                    {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    First Name:
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Username: 
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <label>
                    Confirm Password: 
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <p> By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive Email Notification/marketing from us and can opt out any time.</p>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
        
}
