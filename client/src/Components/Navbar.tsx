import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../useAuth'

type Auth = {
    authed: boolean,
    logout: () => void,
    username: string
}

export default function Navbar() {

    const { authed, logout, username }: Auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="list">
            <ul className="topnav">
                {!authed ? <li><Link to="/start">Start</Link></li> : ""}
                {authed ? <>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/budget-app" >Budget App</Link></li>
                    <li><Link to="/history" >History</Link></li>
                    <li><Link to="/profile" >User {username ? ": " + username : ''}</Link></li>
                    <li className="right"><Link onClick={handleLogout} to="/">Log out</Link></li>
                </> : <>
                    <li className="right"><Link to="/register">Register now!</Link></li>
                    <li className="right"><Link to="/login">Log in</Link></li>
                </>}
            </ul>
        </div>
    )
}