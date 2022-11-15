import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { Link } from "react-router-dom";

export default function ProfileButton({ user, setLogin, setShowModal }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const onClickMenuButton = (e) => {
        e.stopPropagation();
        if (showMenu) {
            setShowMenu(false);
            return;
        }
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) {
            return;
        }          
        
        const closeMenu = (e) => {
            e.stopPropagation();
            setShowMenu(false);
        }
        
        document.addEventListener('click', closeMenu);
      
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.userLogout());
    };

    return (
        <>
            <button onClick={onClickMenuButton}>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (user ?
                (<ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <Link to='/hosting'>Manage Listing</Link>
                    <li>
                        <button onClick={logout}>Sign out</button>
                    </li>
                </ul>) : (
                    <ul className="profile-dropdown">
                        <li>
                            <button onClick={() => {
                                setLogin(true)
                                setShowModal(true)
                            }}>Login</button>
                        </li>
                        <li>
                            <button onClick={() => {
                                setLogin(false)
                                setShowModal(true)
                            }}>SignUp</button>
                        </li>
                    </ul>
                )
            )}
        </>
    )
}
