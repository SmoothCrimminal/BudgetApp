import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from '../../Components/Navbar'

export default function Register() {

    const navigate = useNavigate()

    const [info, setInfo] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = (form_data) => {

        const data = {
            username: form_data.login,
            password: form_data.password,
            budget: parseFloat(form_data.budget)
        };
        console.log(JSON.stringify(data))
        fetch("http://192.168.1.25:5000/Users/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                console.log(response)
                switch (response.status) {
                    case 401:
                        setInfo("USER TAKEN")
                        return
                    case 200:
                        break;
                    default:
                        setInfo("BŁAD SERWERA")
                        return
                }
                localStorage.setItem("token", "cebula");
                localStorage.setItem("login", data.login);
                navigate('/home');
                window.location.reload()
            }, (error) => {
                if (error) {
                    console.log(error)
                }
            })
    }

    return (
        <div>
            <Navbar />
            <h1>REGISTER</h1>
            <h2>{info}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label htmlFor="text">Login</label>
                    <input required type="text" {...register("login")} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="text">Password</label>
                    <input required type="password" {...register("password")} placeholder="Enter password..." />
                </div>
                <div className="form-control">
                    <label htmlFor="text">Budget</label>
                    <input type="number" {...register("budget")} />
                </div>
                <button type="submit" className="btn">Register</button>
            </form>
            <li><Link to="/login">Login</Link></li>
        </div>
    )
}