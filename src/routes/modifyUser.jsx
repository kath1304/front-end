import {useForm} from "react-hook-form";
import {useNavigate, useLocation} from "react-router-dom";
import React, {useCallback, useEffect} from "react";
import axios from 'axios';
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";


export default function ModifyUser() {
    const location = useLocation();
    const navigate = useNavigate()
    const token = localStorage.getItem('authentication')
    const loggedUser = localStorage.getItem('username')
    const role = localStorage.getItem('role');
    useEffect(() => {
        axios.post('http://localhost:3001/validate', {username: loggedUser}, {headers: {'authorization': token}})
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
            role: ''
        }
    });

    const fetchUser = useCallback(() => {
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

        axios.put('http://localhost:3001/' + location.state.user, {
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
                        color={"secondary"}> Modify</Button>
                </Stack>

            </form>
        </div>
    )


}