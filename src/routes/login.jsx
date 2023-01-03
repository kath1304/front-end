import React from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
//import "./styles.css";
export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });


    const onSubmit = (data) => {
        console.log(data.username)
        axios.post('http://localhost:3001/login/auth', {username: data.username, password: data.password})
            .then((response) => {
                localStorage.setItem("authentication", "Bearer " + response.data)

            })
            .then((result) => {
                console.log(result)//chiedere il path successivo
            })
            .catch((e) => {
                console.error(e)
            })
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Username</label>
                    <input type="text" name="username" {...register("username", {required: true})} />
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input type="password" name="password" {...register("password", {required:true})} />
                </div>
                <div className="form-control">
                    <label></label>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}