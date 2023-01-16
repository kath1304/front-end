import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import React from "react";
import axios from 'axios';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Button from '@mui/material/Button';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {address} from "../index";


export default function Signup() {
    const token = localStorage.getItem('authentication')
    const loggedUser = localStorage.getItem('username')
    const role = localStorage.getItem('role');
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role_name: '',
        }
    });
    const [newRole, setNewRole] = React.useState('');
    const handleChange = (event) => {
        setNewRole(event.target.value);
    };


    const onSubmit = (data) => {
        axios.post(address + '/users/', {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            role_name: data.role_name,
        }, {headers: {'authorization': token, 'role': role}})
            .then(() => {
                return navigate('/paths/checkUser', {state: {user: data.username}})
            })
            .catch((error) => {
                console.error(error)
            })
    }


    axios.post(address + '/validate', {username: loggedUser}, {headers: {'authorization': token}})
        .then((response) => {
            if (!response.data) {
                return navigate('/')
            }
            if (role === 'user') {
                return navigate('/paths/user')
            }
        })
        .catch(e => {
            console.error(e)
        })
    return (

        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>

                <LockPersonIcon fontSize="large" color={"secondary"}/>
                 <Typography variant="h5"> Registration  </Typography>

                <Box
                    sx={{
                        '& .MuiTextField-root': {m: 0.5, width: '25ch'},
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
                            {...register("username", {required: true})}
                        />
                    </div>

                    <div>
                        <TextField
                            id="outlined-firstname-input"
                            label="First Name"
                            name="firstname"
                            autoComplete="current-firstname"
                            {...register("firstname", {required: true})}
                        />
                    </div>

                    <div>
                        <TextField
                            id="outlined-lastname-input"
                            label="Last Name"
                            name="lastname"
                            autoComplete="current-lastname"
                            {...register("lastname", {required: true})}
                        />
                    </div>

                    <div>
                        <TextField
                            id="outlined-email-input"
                            label="E - mail"
                            name="email"
                            autoComplete="current-email"
                            {...register("email", {required: true})}
                        />
                    </div>

                    <div>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            {...register("password", {required: true})}
                        />
                    </div>

                    <div>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newRole}
                                label="Role"
                                {...register("role_name", {required: true})}
                                onChange={handleChange}
                            >
                                <MenuItem value={'admin'}>Admin</MenuItem>
                                <MenuItem value={'user'}>User</MenuItem>
                            </Select>
                        </FormControl>
                    </div>


                </Box>
                <Stack spacing={2} direction="row-reverse">
                    <Button
                        variant="contained"
                        type="submit"
                        color={"secondary"}> Sign Up</Button>
                </Stack>

            </form>
        </div>
    )
}