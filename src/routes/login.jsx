import React from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const oldToken = localStorage.getItem('authentication')
    const navigate = useNavigate()
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

    axios.get('http://localhost:3001/validate', {headers: {'authorization': oldToken}})
        .then((response) => {
            if(response.data) {
                if (localStorage.getItem('role') === 'admin') {
                    return navigate('/admin')
                } else if (localStorage.getItem('role') === 'user') {
                    return navigate('/user')
                }
            }
        })
        .catch(e => {console.error(e)})


    const onSubmit = (data) => {
        console.log(data.username)
        axios.post('http://localhost:3001/login/auth', {username: data.username, password: data.password})
            .then((response) => {
                localStorage.setItem("authentication", "Bearer " + response.data.token)
                localStorage.setItem("role", response.data.role)
                if(response.data.role === 'admin') {
                    return navigate('/admin')
                }
                else {
                    return navigate('/user')
                }
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