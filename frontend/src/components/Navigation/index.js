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
import NewSpot
    from "../CreateNewSpot";
export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user); 
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(true);

    return (
        <div className="navigation">
            <div className="navigation-logo">
                <NavLink exact to='/'><img src={logo} alt='logo' style={{width:120, height:80} } /></NavLink>
            </div>
            <div>

            </div>
            <div className="navigation-bar">
                {isLoaded && (
                    <>
                    <ProfileButton
                        user={sessionUser}
                        setLogin={setLogin}
                        setShowModal={setShowModal}
                    />
                        <NewSpot />
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
