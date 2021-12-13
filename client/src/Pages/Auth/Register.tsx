import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useForm } from "react-hook-form";

type RegisterData = {
    username: string,
    password: string,
    budget: string
}

export default function Register() {

    const navigate = useNavigate()

    const [info, setInfo] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = (form_data: RegisterData) => {

        const data = {
            username: form_data.username,
            password: form_data.password,
            budget: parseFloat(form_data.budget)
        };

        // Do testów
        navigate('/login');


        fetch("http://" + process.env.REACT_APP_IP + ":5000/Users/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                switch (response.status) {
                    case 401:
                        setInfo("USER TAKEN")
                        return
                    case 200:
                        break;
                    default:
                        setInfo("SERVER ERROR")
                        return
                }
                navigate('/login');
            }, (error) => {
                if (error) {
                    console.log(error)
                }
            })
    }

    return (
        <div>
            <h1>REGISTER</h1>
            <h2>{info}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label htmlFor="text">Username</label>
                    <input required type="text" {...register("username")} placeholder="Enter text..." />
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
        </div>
    )
}