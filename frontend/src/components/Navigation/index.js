import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { Modal } from "../../context/Modal";
import SignUpForm from "../SignupFormModal/SignupForm";
import LoginForm from "../LoginFormModal/LoginForm";
import './Navigation.css';
import logo from './logo-hairbnb.png';
import NewSpot from "../CreateNewSpot";
import SearchBox from "./Search";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user); 
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(true);

    return (
        <div className="navigation">
            <div className="navigation-logo">
                <NavLink exact to='/'><img src={logo} alt='logo' style={{width:120, height:80} } /></NavLink>
            </div>
            <div className="navigation-mid">
                <div className="search-container">
                    <div className="search-where">
                        <span>Anywhere</span>
                    </div>
                    <div className="search-time">
                        <span>Any week</span>
                    </div>
                    <div className="search-guest">
                        <div>
                            <span>Any Price</span>
                        </div>
                        <div className="btn-container">
                            <button className="btn-search"><i className="fa-solid fa-magnifying-glass" style={{fontSize:14}}></i></button>
                        </div>
                    </div>
                </div>
               
            </div>
            <div className="navigation-bar">
                {isLoaded && (
                    <>
                    <ProfileButton
                        user={sessionUser}
                        setLogin={setLogin}
                        setShowModal={setShowModal}
                    />
                        <div className="link-createspot">
                            <NewSpot />
                        </div>
                    </>
                    )}
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {login ? <LoginForm setShowModal={setShowModal}/> : <SignUpForm setShowModal={setShowModal}/>}
                </Modal>
            )}
        </div>
    )
}
