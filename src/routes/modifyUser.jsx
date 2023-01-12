import {useForm} from "react-hook-form";
import {useNavigate, useLocation} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import axios from 'axios';


export default function ModifyUser() {
    const location = useLocation();
    const navigate = useNavigate()
    useEffect(() => {
        fetchUser();
    }, []);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: ''
        }
    });

    const fetchUser = useCallback(() => {
        const token = localStorage.getItem('authentication')
        console.log(location.state.user)
        axios
            .get('http://localhost:3001/users/' + location.state.user, {headers: {'authorization': token}})
            .then((res) => {
                console.log(res);
                reset(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reset])

    const onSubmit = useCallback((data) => {
        const token = localStorage.getItem('authentication')
        const role = localStorage.getItem('role');
        console.log(data.firstname)
        console.log(role)
        if (role === 'user') {
            console.log('stop you cannot access');
        }

        axios.post('http://localhost:3001/' + location.state.user, {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        }, {headers: {'authorization': token, 'role': role}})
            .then((response) => {
                return navigate('/showDatabase')
            })
            .catch((error) => {
                console.error(error)
            })
    }, [navigate])


    return (

        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control">
                    <label>Username</label>
                    <input type="text" name="username"  {...register("username", {required: true})} />
                </div>

                <div className="form-control">
                    <label>Firstname</label>
                    <input type="text" name="firstname" {...register("firstname", {required: true})} />
                </div>

                <div className="form-control">
                    <label>Lastname</label>
                    <input type="text" name="lastname" {...register("lastname", {required: true})} />
                </div>

                <div className="form-control">
                    <label>Email</label>
                    <input type="text" name="email" {...register("email", {required: true})} />
                </div>

                <div className="form-control">
                    <label>Role</label>
                    <input type="text" name="role" {...register("role", {required: true})} />
                </div>


                <div className="form-control">
                    <label>Password</label>
                    <input type="password" name="password" {...register("password", {required: true})} />
                </div>

                <div className="form-control">
                    <label></label>
                    <button type="submit">Modify User</button>
                </div>
            </form>
        </div>
    )


}