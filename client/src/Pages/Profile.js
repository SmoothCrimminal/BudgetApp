import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'

export default function Profile() {

    const login = localStorage.getItem("login");
    const [user, setUser] = useState({ id: '', username: '', password: '', budget: '', creationDate: '' });

    useEffect(() => {
        fetch("http://192.168.1.25:5000/Users/" + login)
            .then((response) => { response.json() },
                (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
            .then((data) => {
                return data;
            })
            .then((data) => setUser(data));
    }, [login]);

    return (
        <>
            <Navbar />
            {user ? user.id ? <>
                <h1>PROFILE {login}</h1>
                <p>NAME: {user.username}</p>
                <p>BUDGET: {user.budget}</p>
                <p>CREATION DATE: {user.creationDate}</p>
            </> : "LOADING DATA" : "BLAD"}
        </>
    )
}