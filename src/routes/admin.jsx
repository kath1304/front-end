import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../App.css"
import * as PropTypes from "prop-types";
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Button from "@mui/material/Button";

function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};
export default function Admin() {
    const navigate = useNavigate()
    const token = localStorage.getItem('authentication')
    const loggedUser = localStorage.getItem('username')

    axios.post('http://localhost:3001/validate', {username: loggedUser}, {headers: {'authorization': token}})
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
        })

    const handleClickShowUsers = () => {
        navigate('/paths/showUsers')
    }

    const handleClickSignUp = () => {
        navigate('/paths/sign')
    }

    return(
        <div id="admin-home">
            <div className="admin-home-square">
                <Button className="admin-home-selection" onClick={handleClickShowUsers}>
                    <GroupIcon></GroupIcon>
                    <div>Show users</div>
                </Button>
            </div>
            <div className="admin-home-square">
                <Button className="admin-home-selection" onClick={handleClickSignUp}>
                    <GroupAddIcon></GroupAddIcon>
                    <div>Sign Up User</div>
                </Button>
            </div>
        </div>
    )
}