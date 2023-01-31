import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import axios from 'axios';
import TextField from "@mui/material/TextField";
import {Alert, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import {address, addressApi} from "../index";
import Typography from "@mui/material/Typography";


export default function EditUser() {
    const location = useLocation();
    const navigate = useNavigate()
    const token = localStorage.getItem('authentication')
    const loggedUser = localStorage.getItem('username')
    const role = localStorage.getItem('role');
    const [error, setError] = useState(false)
    const {
        register,
        handleSubmit,
        reset
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
                localStorage.removeItem('authentication')
                localStorage.removeItem('role')
                localStorage.removeItem('username')
                return navigate('/');
            });
        // eslint-disable-next-line
    }, []);

    const fetchUser = useCallback(() => {
        console.log(location.state.user)
        axios
            .get(addressApi + '/users/' + location.state.user, {headers: {'authorization': token}})
            .then((res) => {
                console.log(res);
                reset(res.data);
            })
            .catch((err) => {
                console.log(err);
                localStorage.removeItem('authentication')
                localStorage.removeItem('role')
                localStorage.removeItem('username')
                return navigate('/');
            });
        // eslint-disable-next-line
    }, [reset])

    const [newRole, setNewRole] = React.useState('');
    const handleChange = (event) => {
        setNewRole(event.target.value);
    };

    const onSubmit = useCallback((data) => {
        setError(false)
        console.log(data.firstname)
        console.log(role)
        if (role === 'user') {
            console.log('stop you cannot access');
        }

        axios.put(addressApi + '/users/' + location.state.user, {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            role_name: data.role_name,
        }, {headers: {'authorization': token, 'role': role}})
            .then(() => {
                return navigate('/paths/showUsers')
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
        // eslint-disable-next-line
    }, [navigate])


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
                <EditIcon fontSize="large" color={"secondary"}/>
                <Typography variant="h5">Edit user</Typography>

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
                            name="username"
                            label="Username"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="current-username"
                            sx={{width: '100%'}}
                            {...register("username", {required: true})}
                        />
                    </div>
                    <div style={{width: '45%'}}>
                        <TextField
                            id="outlined-firstname-input"
                            name="firstname"
                            label="First Name"
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                            name="lastname"
                            label="Last Name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="current-lastname"
                            sx={{width: '100%'}}
                            {...register("lastname", {required: true})}
                        />
                    </div>
                    <div style={{width: '45%'}}>
                        <TextField
                            id="outlined-email-input"
                            name="email"
                            label="E-mail"
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                        Confirm
                    </Button>

                    <Button onClick={() => {
                        navigate('/paths/showUsers');
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