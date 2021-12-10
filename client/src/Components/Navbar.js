import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../useAuth'

export default function Navbar() {

    const { authed, logout, username } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="list">
            <ul class="topnav">
                {!authed ? <li><Link to="/start">Start</Link></li> : ""}
                {authed ? <>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/budget-app" >Budget App</Link></li>
                    <li><Link to="/history" >History</Link></li>
                    <li><Link to="/profile" >User {username ? ": " + username : ''}</Link></li>
                    <li class="right"><Link onClick={handleLogout} to="/">Log out</Link></li>
                </> : <>
                    <li class="right"><Link to="/register">Register now!</Link></li>
                    <li class="right"><Link to="/login">Log in</Link></li>
                </>}
            </ul>
        </div>
    )
}