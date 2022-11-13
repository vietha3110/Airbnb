import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';


export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = (e) => {
        e.stopPropagation();
        if (showMenu) return;
    
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
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Sign out</button>
                    </li>
                </ul>
            )}
        </>
    )
}
