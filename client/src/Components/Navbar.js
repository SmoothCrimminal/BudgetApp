import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("login");
        navigate('/');
        window.location.reload()
    }
    const login = localStorage.getItem("login");


    return (
        <div className="list">
            <ul class="topnav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/app" >App</Link></li>
                <li><Link to="/profile" >Profile - {login}</Link></li>
                <li class="right"><Link onClick={logout} to="/">Log out</Link></li>
            </ul>
        </div>
    )
}