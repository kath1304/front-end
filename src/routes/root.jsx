import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import axios from "axios";
import {Outlet, useNavigate} from "react-router-dom";
import {intervalId} from "./login";

let navigate

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </SvgIcon>
    );
}

function handleClickLogout() {
    axios.get('http://localhost:3001/logout/', {headers: {'authorization': localStorage.getItem('authentication')}})
        .then(() => {
            localStorage.removeItem('authentication')
            localStorage.removeItem('role')
            localStorage.removeItem('username')
            clearInterval(intervalId)
            return navigate('/')
        })
        .catch(e => {
            console.error(e)
        })
}

function handleClickHome() {
    let role = localStorage.getItem('role')
    if (role === 'admin') {
        return navigate('/paths/admin')
    }
    return navigate('/paths/user')
}

export default function Root() {
    navigate = useNavigate()
    //add render name, surname
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={() => {
                            handleClickHome()
                        }}
                    >
                        <HomeIcon/>
                    </IconButton>
                    <Button color="inherit" onClick={() => {
                        handleClickLogout()
                    }}>Log out</Button>
                </Toolbar>
            </AppBar>
            <div id="detail">
                <Outlet/>
            </div>
        </Box>
    );
}