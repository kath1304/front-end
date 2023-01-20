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
import {useNavigate} from "react-router-dom";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from '@mui/icons-material/Edit';
import {address} from "../index";

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
    const loggedUser = localStorage.getItem('username')
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
            .delete(address + '/users/' + currentUsername, {headers: {'authorization': localStorage.getItem('authentication')}})
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
        axios.post(address + '/validate', {username: loggedUser},{headers: {'authorization': token}})
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
        // eslint-disable-next-line
    }, []);

    const fetchUsers = () => {
        axios
            .get(address + '/users/', {headers: {'authorization': token}})
            .then((res) => {
                console.log(res);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleClickEdit = (username) => {
        navigate('/paths/editUser', {state: {user: username}})
    }

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#9c27b0",
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
        },
    }));

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "theme.palette.action.hover",
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
                        <StyledTableCell align="left">USERNAME</StyledTableCell>
                        <StyledTableCell align="left">FIRST NAME</StyledTableCell>
                        <StyledTableCell align="left">LAST NAME</StyledTableCell>
                        <StyledTableCell align="left">E - MAIL</StyledTableCell>
                        <StyledTableCell align="left">ROLE</StyledTableCell>
                        <StyledTableCell align="left" colSpan="2"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user) => (
                        <StyledTableRow key={user.username}>
                            <StyledTableCell component="th" scope="row" align="left">{user?.username}
                            </StyledTableCell>
                            <StyledTableCell align="left">{user?.firstname}</StyledTableCell>
                            <StyledTableCell align="left">{user?.lastname}</StyledTableCell>
                            <StyledTableCell align="left">{user?.email}</StyledTableCell>
                            <StyledTableCell align="left">{user?.role_name}</StyledTableCell>

                            <StyledTableCell align="right">
                                <Button onClick={() => {
                                    handleOpen(user?.username)
                                }} variant="outlined" startIcon={<DeleteIcon/>} color={"error"}>
                                    Delete
                                </Button>
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <Button onClick={() => {
                                    handleClickEdit(user?.username)
                                }} variant="outlined" startIcon={<EditIcon/>} color={"primary"}>
                                    Edit
                                </Button>
                            </StyledTableCell>


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
                        Confirm deletion of user: {currentUsername}?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <Button onClick={handleConferma}>Confirm</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </Typography>
                </Box>
            </Modal>
        </TableContainer>
    )

}