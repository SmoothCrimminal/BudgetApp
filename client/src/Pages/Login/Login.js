import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from '../../Components/Navbar'

export default function Login() {

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();

    const [info, setInfo] = useState('');

    const onSubmit = (data) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'username': data.login, 'password': data.password },
        };
        fetch("http://192.168.1.25:5000/Users/", requestOptions)
            .then((response) => {
                console.log(response)
                if (response.status !== 200) {
                    setInfo("NIEPOPRAWNY LOGIN LUB HASŁO")
                    return
                }
                localStorage.setItem("token", "cebula");
                localStorage.setItem("login", data.login);
                navigate('/home');
                window.location.reload()
            }, (error) => {
                if (error) {
                    setInfo("BLAD SERWERA")
                    console.log(error)
                }
            })
    }

    return (
        <div>
            <Navbar />
            <h1>LOGIN</h1>
            <h2>{info}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label htmlFor="text">Login</label>
                    <input {...register("login")} required type="text" placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="text">Password</label>
                    <input {...register("password")} required type="password" placeholder="Enter password..." />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            <li><Link to="register">Register</Link></li>
        </div>
    )
}