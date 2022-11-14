import React from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';
import logo from './logo-hairbnb.png';
import NewSpot
    from "../CreateNewSpot";
export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user); 

    let sessionLinks; 
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <NewSpot/>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div className="navigation-login">
                    <LoginFormModal />
                </div>
                <div className="navigation-signup">
                    <SignupFormModal />
                </div>
            </>
        );
    }

    return (
        <div className="navigation">
            <div className="navigation-logo">
                <NavLink exact to='/'><img src={logo} alt='logo' style={{width:120, height:80} } /></NavLink>
            </div>
            <div>

            </div>
            <div className="navigation-bar">
                    {isLoaded && sessionLinks}
            </div>
        </div>
    )
}
