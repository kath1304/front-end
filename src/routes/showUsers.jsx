import React, {useEffect, useState} from "react";
import axios from 'axios';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link, useNavigate} from "react-router-dom";


export default function ShowUsers() {

    const navigate = useNavigate()
    const token = localStorage.getItem('authentication')
    const role = localStorage.getItem('role')
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/validate', {headers: {'authorization': token}})
            .then((response) => {
                if (!response.data) {
                    return navigate('/')
                }
                if (role !== "admin") {
                    return navigate('/paths/user')
                }
                fetchUsers();
            })
            .catch(e => {
                console.error(e)
            })
    }, []);

    const fetchUsers = () => {
        axios
            .get('http://localhost:3001/users/', {headers: {'authorization': token}})
            .then((res) => {
                console.log(res);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleClickModify = (username) => {
        navigate('/paths/modifyUser', {state:{user: username}})
    }

    const handleClickDelete = (username) => {
        navigate('/paths/deleteUser', {state:{user: username}})
    }


    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">username</StyledTableCell>
                        <StyledTableCell align="right">firstname</StyledTableCell>
                        <StyledTableCell align="right">lastname</StyledTableCell>
                        <StyledTableCell align="right">email</StyledTableCell>
                        <StyledTableCell align="right">role</StyledTableCell>
                        <StyledTableCell align="center" colSpan="2">edit</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user) => (
                        <StyledTableRow key={user.name}>
                            <StyledTableCell component="th" scope="row" align="right">{user?.username}
                            </StyledTableCell>
                            <StyledTableCell align="right">{user?.firstname}</StyledTableCell>
                            <StyledTableCell align="right">{user?.lastname}</StyledTableCell>
                            <StyledTableCell align="right">{user?.email}</StyledTableCell>
                            <StyledTableCell align="right">{user?.role_name}</StyledTableCell>
                            <StyledTableCell align="right">
                                <button onClick={() => {
                                    handleClickDelete(user?.username)
                                }}>delete
                                </button>
                            </StyledTableCell>
                            <StyledTableCell align="right"><button onClick={() => {
                                handleClickModify(user?.username)
                            }}>modify
                            </button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )


    /*return (
        <div className="App">
            <h2>
                Tabella degli utenti
            </h2>
            <table className="tabella">
                <thead>
                <tr>
                    <th>username</th>
                    <th>firstname</th>
                    <th>lastname</th>
                    <th>email</th>
                    <th>role</th>
                    <th colSpan="2">Edit</th>
                </tr>
                </thead>
                <tbody>
                {
                    users?.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{data?.username}</td>
                                <td>{data?.firstname}</td>
                                <td>{data?.lastname}</td>
                                <td>{data?.email}</td>
                                <td>{data?.role_name}</td>

                                <td><button onClick= {() => {handleClickModify(data?.username)}}>modify</button></td>
                                <td><button onClick= {() => {handleClickDelete(data?.username)}}>delete</button></td>

                                <td>
                                    <button onClick={() => {
                                        toComponentB(data?.username)
                                    }}>delete
                                    </button>
                                </td>
                                <td><Link to={"/modifyUser"}>
                                    <button>modify</button>
                                </Link></td>

                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );

*/

}