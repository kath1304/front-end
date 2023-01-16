import {useForm} from "react-hook-form";
import {useNavigate, useLocation} from "react-router-dom";
import React, {useCallback, useEffect} from "react";
import axios from 'axios';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import {address} from "../index";


export default function ModifyUser() {
    const location = useLocation();
    const navigate = useNavigate()
    const token = localStorage.getItem('authentication')
    const loggedUser = localStorage.getItem('username')
    const role = localStorage.getItem('role');
    useEffect(() => {
        axios.post(address + '/validate', {username: loggedUser}, {headers: {'authorization': token}})
            .then((response) => {
                if (!response.data) {
                    return navigate('/')
                }
                if (role !== "admin") {
                    return navigate('/paths/user')
                }
                fetchUser();
            })
            .catch(e => {
                console.error(e)
            });
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
            role_name: ''
        }
    });

    const fetchUser = useCallback(() => {
        console.log(location.state.user)
        axios
            .get(address + '/users/' + location.state.user, {headers: {'authorization': token}})
            .then((res) => {
                console.log(res);
                reset(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reset])

    const [newRole, setNewRole] = React.useState('');
    const handleChange = (event) => {
        setNewRole(event.target.value);
    };

    const onSubmit = useCallback((data) => {
        console.log(data.firstname)
        console.log(role)
        if (role === 'user') {
            console.log('stop you cannot access');
        }

        axios.put(address + '/users/' + location.state.user, {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            role_name: data.role_name,
        }, {headers: {'authorization': token, 'role': role}})
            .then((response) => {
                return navigate('/paths/showUsers')
            })
            .catch((error) => {
                console.error(error)
            })
    }, [navigate])


    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>

                <EditIcon fontSize="medium" color={"secondary"}/>

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
                            name="username"
                            label="Username"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="current-username"
                            {...register("username", {required: true})}
                        />
                    </div>

                    <div>
                        <TextField
                            id="outlined-firstname-input"
                            name="firstname"
                            label="First Name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="current-firstname"
                            {...register("firstname", {required: true})}
                        />
                    </div>

                    <div>
                        <TextField
                            id="outlined-lastname-input"
                            name="lastname"
                            label="Last Name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="current-lastname"
                            {...register("lastname", {required: true})}
                        />
                    </div>

                    <div>
                        <TextField
                            id="outlined-email-input"
                            name="email"
                            label="E-mail"
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                        color={"secondary"}> Modify</Button>
                </Stack>

                <Button onClick={() => {
                    navigate('/paths/showUsers');
                }}
                    variant="contained"
                    type="submit"
                    color={"secondary"}> Back
                </Button>

            </form>
        </div>
    )


}