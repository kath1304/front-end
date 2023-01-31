import React, {useState} from "react";
import axios from 'axios';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {address} from "../index";
import Typography from "@mui/material/Typography";
import {Alert} from "@mui/material";

export let intervalId

const navigate = useNavigate()

const autoRenew = () => {
    axios.get(address + '/renewToken', {headers: {'authorization': localStorage.getItem('authentication')}})
        .then((response) => {
            localStorage.setItem("authentication", "Bearer " + response.data.token)
            localStorage.setItem("role", response.data.role)
        })
        .catch(e => {
            console.error(e)
            localStorage.removeItem('authentication')
            localStorage.removeItem('role')
            localStorage.removeItem('username')
            return navigate('/');
        })
}
export default function Login() {
    const oldToken = localStorage.getItem('authentication')
    const loggedUser = localStorage.getItem('username')
    const [error, setError] = useState(false)
    const {
        register,
        handleSubmit
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    axios.post(address + '/validate', {username: loggedUser}, {headers: {'authorization': oldToken}})
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
        setError(false)
        console.log(data.username)
        axios.post(address + '/login', {username: data.username, password: data.password})
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
                if(e.request.status === 403) setError(true)
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
                    {error && <Alert severity="error" sx={{marginTop: '2%'}}>Username or password not valid</Alert>}
                </Box>
            </form>
        </div>
    )

}