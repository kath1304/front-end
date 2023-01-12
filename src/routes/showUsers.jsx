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
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ShowUsers() {

    const navigate = useNavigate()
    const token = localStorage.getItem('authentication')
    const role = localStorage.getItem('role')
    const [users, setUsers] = useState([]);

    const [open, setOpen] = useState(false)

    const [currentUsername, setCurrentUsername] = useState(null)

    const handleOpen = username => {
        setCurrentUsername(username)
        setOpen(true)
    }

    const handleClose = () => {
        setCurrentUsername(null)
        setOpen(false)
    }

    const handleConferma = () => {
        axios
            .delete('http://localhost:3001/users/' + currentUsername, {headers: {'authorization': localStorage.getItem('authentication')}})
            .then(() => {
                setUsers(users.filter(user => user.username !== currentUsername))
                setCurrentUsername(null)
                setOpen(false)
            })
            .catch((error) => {
                console.error(error)
            })
    }

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
                        <StyledTableRow key={user.username}>
                            <StyledTableCell component="th" scope="row" align="right">{user?.username}
                            </StyledTableCell>
                            <StyledTableCell align="right">{user?.firstname}</StyledTableCell>
                            <StyledTableCell align="right">{user?.lastname}</StyledTableCell>
                            <StyledTableCell align="right">{user?.email}</StyledTableCell>
                            <StyledTableCell align="right">{user?.role_name}</StyledTableCell>
                            <StyledTableCell align="right">
                                <button onClick={() => {
                                    handleOpen(user?.username)
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confermi rimozione dell'utente {currentUsername}?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <Button onClick={handleConferma}>Conferma</Button>
                        <Button onClick={handleClose}>Annulla</Button>
                    </Typography>
                </Box>
            </Modal>
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