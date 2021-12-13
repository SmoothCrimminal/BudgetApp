import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from '../../useAuth'

type LoginData = {
    username: string,
    password: string
}

export default function Login() {

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const { login } = useAuth();
    const { state } = useLocation();
    const [info, setInfo] = useState('');

    const onSubmit = (data: LoginData) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'username': data.username, 'password': data.password },
        };

        //Do testów
        login(data.username, "cebula").then(() => {
            navigate(state?.path || "/home");
        });

        fetch("http://" + process.env.REACT_APP_IP + ":5000/Users/", requestOptions)
            .then((response) => {
                if (response.status !== 200) {
                    setInfo("NIEPOPRAWNY LOGIN LUB HASŁO")
                    return
                }
                login(data.username, "cebula").then(() => {
                    navigate(state?.path || "/home");
                });
            }, (error) => {
                if (error) {
                    setInfo("BLAD SERWERA")
                    console.log(error)
                }
            })
    }

    return (
        <div>
            <h1>LOG IN</h1>
            <h2>{info}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label htmlFor="text">Username</label>
                    <input {...register("username")} required type="text" placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="text">Password</label>
                    <input {...register("password")} required type="password" placeholder="Enter password..." />
                </div>
                <button type="submit" className="btn">Log in</button>
            </form>
        </div>
    )
}