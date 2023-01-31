import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from 'axios';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Button from '@mui/material/Button';
import "../App.css"
import TextField from '@mui/material/TextField';
import {Alert, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import {address, addressApi} from "../index";


export default function RegisterUser() {
    const token = localStorage.getItem('authentication')
    const loggedUser = localStorage.getItem('username')
    const role = localStorage.getItem('role');
    const navigate = useNavigate()
    const [newRole, setNewRole] = useState('');
    const [error, setError] = useState(false)
    const {
        register,
        handleSubmit
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

    const handleChange = (event) => {
        setNewRole(event.target.value);
    };


    const onSubmit = (data) => {
        setError(false)
        axios.post(addressApi + '/users/', {
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
                if(error.request.status === 409) setError(true)
                else {
                    localStorage.removeItem('authentication')
                    localStorage.removeItem('role')
                    localStorage.removeItem('username')
                    return navigate('/');
                }
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
            localStorage.removeItem('authentication')
            localStorage.removeItem('role')
            localStorage.removeItem('username')
            return navigate('/');
        })

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}
                  style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      marginTop: '5%'
                  }}>
                {error && <Alert severity="error" sx={{marginBottom: '2%'}}>A user with this username already exists</Alert>}
                <LockPersonIcon fontSize="large" color={"secondary"}/>
                <Typography variant="h5">Register user</Typography>

                <div style={{
                    display: 'flex',
                    width: '50%',
                    justifyContent: 'space-between',
                    marginTop: '2%',
                    marginBottom: '2%'
                }}>
                    <div style={{width: '45%'}}>
                        <TextField
                            id="outlined-username-input"
                            label="Username"
                            name="username"
                            autoComplete="current-username"
                            sx={{width: '100%'}}
                            {...register("username", {required: true})}
                        />
                    </div>
                    <div style={{width: '45%'}}>
                        <TextField
                            id="outlined-firstname-input"
                            label="First Name"
                            name="firstname"
                            autoComplete="current-firstname"
                            sx={{width: '100%'}}
                            {...register("firstname", {required: true})}
                        />
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    width: '50%',
                    justifyContent: 'space-between',
                    marginBottom: '2%'
                }}>
                    <div style={{width: '45%'}}>
                        <TextField
                            id="outlined-lastname-input"
                            label="Last Name"
                            name="lastname"
                            autoComplete="current-lastname"
                            sx={{width: '100%'}}
                            {...register("lastname", {required: true})}
                        />
                    </div>
                    <div style={{width: '45%'}}>
                        <TextField
                            id="outlined-email-input"
                            label="E - mail"
                            name="email"
                            autoComplete="current-email"
                            sx={{width: '100%'}}
                            {...register("email", {required: true})}
                        />
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    width: '50%',
                    justifyContent: 'space-between',
                    marginBottom: '2%'
                }}>
                    <div style={{width: '45%'}}>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            sx={{width: '100%'}}
                            {...register("password", {required: true})}
                        />
                    </div>
                    <div style={{width: '45%'}}>
                        <FormControl sx={{width: '100%'}}>
                            <InputLabel id="create-user-form-role">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="create-user-form-role-select"
                                value={newRole}
                                label="Role"
                                sx={{width: '100%'}}
                                {...register("role_name", {required: true})}
                                onChange={handleChange}
                            >
                                <MenuItem value={'admin'}>Admin</MenuItem>
                                <MenuItem value={'user'}>User</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    width: '20%',
                    justifyContent: 'space-between'
                }}>
                    <Button
                        variant="contained"
                        type="submit"
                        color={"secondary"}
                        sx={{width: '45%'}}>
                        Register
                    </Button>

                    <Button onClick={() => {
                        navigate('/paths/admin');
                    }}
                            variant="contained"
                            type="submit"
                            color={"secondary"}
                            sx={{width: '45%'}}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )

}