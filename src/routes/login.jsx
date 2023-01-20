import React from "react";
import axios from 'axios';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {address} from "../index";
import Typography from "@mui/material/Typography";

export let intervalId

const autoRenew = () => {
    axios.get(address + '/renewToken', {headers: {'authorization': localStorage.getItem('authentication')}})
        .then((response) => {
            localStorage.setItem("authentication", "Bearer " + response.data.token)
            localStorage.setItem("role", response.data.role)
        })
        .catch(e => {
            console.error(e)
        })
}
export default function Login() {
    const oldToken = localStorage.getItem('authentication')
    const loggedUser = localStorage.getItem('username')
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    axios.post('http://10.11.13.97/validate', {username: loggedUser}, {headers: {'authorization': oldToken}})
        .then((response) => {
            if (response.data) {
                if (localStorage.getItem('role') === 'admin') {
                    return navigate('/paths/admin')
                } else if (localStorage.getItem('role') === 'user') {
                    return navigate('/paths/user')
                }
            }
        })
        .catch(e => {
            console.error(e)
        })


    const onSubmit = (data) => {
        console.log(data.username)
        axios.post('http://10.11.13.97/login', {username: data.username, password: data.password})
            .then((response) => {
                localStorage.setItem("authentication", "Bearer " + response.data.token)
                localStorage.setItem("role", response.data.role)
                localStorage.setItem("username", response.data.username)
                intervalId = setInterval(autoRenew, 3480000)
                if (response.data.role === 'admin') {
                    return navigate('/paths/admin')
                } else {
                    return navigate('/paths/user')
                }
            })
            .catch((e) => {
                console.error(e)
                if(e.request.status === 403) alert('Username or password not valid')
            })
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)} style={{marginTop: '10%'}}>

                <div style={{textAlign: "center"}}>
                    <AccountCircleIcon fontSize={"large"} color={"secondary"}/>
                </div>
                <Typography variant="h5" style={{textAlign: 'center', marginBottom: '2%'}}>LOGIN</Typography>

                <Box
                    sx={{
                        '& .MuiTextField-root': {m: 0.8, width: '25ch'},
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="outlined-username-input"
                            label="Username"
                            name="username"
                            autoComplete="current-username"
                            size={"medium"}
                            {...register("username", {required: true})}
                        />
                    </div>

                    <div style={{marginBottom: '2%'}}>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            size={"medium"}
                            {...register("password", {required: true})}
                        />
                    </div>

                    <Button
                        variant="contained"
                        type="submit"
                        color={"secondary"}>
                        Login
                    </Button>
                </Box>
            </form>
        </div>
    )

}