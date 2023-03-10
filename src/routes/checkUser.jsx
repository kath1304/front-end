import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useLocation, useNavigate} from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import EngineeringIcon from '@mui/icons-material/Engineering';
import {address, addressApi} from "../index";

export default function CheckUser() {
    const navigate = useNavigate();
    const token = localStorage.getItem('authentication')
    const location = useLocation();
    const loggedUser = localStorage.getItem('username')


    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.post(address + '/validate', {username: loggedUser}, {headers: {'authorization': token}})
            .then((response) => {
                if (!response.data) {
                    return navigate('/')
                }
                if (localStorage.getItem('role') !== "admin") {
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

    const fetchUser = () => {
        axios
            .get(addressApi + `/users/${location.state.user}`, {headers: {'authorization': token}})
            .then((res) => {
                console.log(res);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                localStorage.removeItem('authentication')
                localStorage.removeItem('role')
                localStorage.removeItem('username')
                return navigate('/');
            });
    }

    return (

        <div className="App">

            <h2>Recap user {user?.username} data</h2>

            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
            >

                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="firstname" secondary={user?.firstname}/>
                </ListItem>

                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="lastname" secondary={user?.lastname}/>
                </ListItem>

                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LocalPostOfficeIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="email" secondary={user?.email} />
                </ListItem>

                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <EngineeringIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="role name" secondary={user?.role_name}/>
                </ListItem>
            </List>
        </div>
    );


}