import React from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from 'react';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {address} from "../index";

export default function User() {
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('authentication')
    const loggedUser = localStorage.getItem('username')
    const [rows, setRows] = useState([])

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#9c27b0",
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
        },
    }));

    useEffect(() => {
        axios.post(address + '/validate', {username: loggedUser}, {headers: {'authorization': token}})
            .then((response) => {
                if (!response.data) {
                    return navigate('/')
                }
                if (role !== "user") {
                    return navigate('/paths/admin')
                }
                axios.get(address + '/loggedSessions/', {headers: {'authorization': token}})
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
                            <StyledTableCell>USERS</StyledTableCell>
                            <StyledTableCell align="right">SESSION</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.user_username}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" >
                                    <h3>{row.user_username}</h3>
                                </TableCell>
                                <TableCell align="right">
                                    <h3>{row.access_date}</h3>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}