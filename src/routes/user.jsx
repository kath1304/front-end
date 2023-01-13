import React from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from 'react';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";

export default function User() {
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('authentication')
    const loggedUser = localStorage.getItem('username')
    const [rows, setRows] = useState([])

    useEffect(() => {
        axios.post('http://localhost:3001/validate', {username: loggedUser}, {headers: {'authorization': token}})
            .then((response) => {
                if (!response.data) {
                    return navigate('/')
                }
                if (role !== "user") {
                    return navigate('/paths/admin')
                }
                axios.get('http://localhost:3001/loggedSessions/', {headers: {'authorization': token}})
                    .then((response) => {
                        setRows(response.data)
                    })
                    .catch(e => {
                        console.error(e)
                    })
            })
            .catch(e => {
                console.error(e)
            })

    }, [])
    return (
        <div className="App">
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Users</TableCell>
                            <TableCell align="right">Session</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.user_username}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.user_username}
                                </TableCell>
                                <TableCell align="right">{row.access_date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}