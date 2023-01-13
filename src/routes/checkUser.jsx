import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useLocation} from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import EngineeringIcon from '@mui/icons-material/Engineering';

export default function CheckUser() {

    const token = localStorage.getItem('authentication')
    const location = useLocation();


    const [user, setUser] = useState([]);
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        axios
            .get(`http://localhost:3001/users/${location.state.user}`, {headers: {'authorization': token}})
            .then((res) => {
                console.log(res);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (

        <div className="App">

            <h2>Riepilogo informazioni per l'utente {user?.username}</h2>

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
                    <ListItemText primary="email"secondary={user?.email} />
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