import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../App.css"
import * as PropTypes from "prop-types";
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Button from "@mui/material/Button";
import {address} from "../index";

function Item() {
    return null;
}

Item.propTypes = {children: PropTypes.node};
export default function Admin() {
    const navigate = useNavigate()
    const token = localStorage.getItem('authentication')
    const loggedUser = localStorage.getItem('username')

    axios.post(address + '/validate', {username: loggedUser}, {headers: {'authorization': token}})
        .then((response) => {
            if (!response.data) {
                return navigate('/')
            }
            const role = localStorage.getItem('role');
            if (role !== 'admin') {
                console.log('stop you cannot access');
                return navigate('/paths/user')
            }
        })
        .catch(e => {
            console.error(e)
            localStorage.removeItem('authentication')
            localStorage.removeItem('role')
            localStorage.removeItem('username')
            return navigate('/');
        })

    const handleClickShowUsers = () => {
        navigate('/paths/showUsers')
    }

    const handleClickRegisterUser = () => {
        navigate('/paths/registerUser')
    }

    return(
        <div style={{
            height: '200px',
            marginTop: '10%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'stretch'
        }}>
            <div className="admin-home-square">
                <Button className="admin-home-selection" onClick={handleClickShowUsers}>
                    <GroupIcon/>
                    <div>Show users</div>
                </Button>
            </div>
            <div className="admin-home-square">
                <Button className="admin-home-selection" onClick={handleClickRegisterUser}>
                    <GroupAddIcon/>
                    <div>Register User</div>
                </Button>
            </div>
        </div>
    )

}