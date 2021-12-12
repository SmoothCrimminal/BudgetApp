import { useEffect, useState } from 'react'
import useAuth from '../useAuth'

export default function Profile() {

    const [user, setUser] = useState({ id: '', username: '', password: '', budget: '', creationDate: '' });
    const { username } = useAuth();

    useEffect(() => {
        fetch("http://" + process.env.REACT_APP_IP + ":5000/Users/" + username)
            .then((response) => response.json(),
                (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
        // .then((data) => {setUser(data)});
    }, [username]);

    const load = <div className="animated-background"></div>

    return (
        <>
            {user ? user.id ? <>
                <h1>PROFILE</h1>
                <p>NAME: <br /> {user.username}</p>
                <p>BUDGET:<br />  {user.budget}</p>
                <p>CREATION DATE: <br /> {user.creationDate}</p>
            </> : <>
                <h1>PROFILE</h1>
                <p>NAME: {load}</p>
                <p>BUDGET: {load}</p>
                <p>CREATION DATE: {load}</p>
            </> : "BLAD"}
        </>
    )
}