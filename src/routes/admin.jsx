import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Admin() {
    const navigate = useNavigate()
    const token = localStorage.getItem('authentication')
    axios.get('http://localhost:3001/validate', {headers: {'authorization': token}})
        .then((response) => {
            if (!response.data) {
                return navigate('/')
            }
        })
        .catch(e => {console.error(e)})
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
        console.log('stop you cannot access');
        return navigate('/')
    }

    return(
        <div>
            <Link to = "/showDatabase">
                <button type="button">Show users</button>
            </Link>
            <Link to = "/sign">
                <button type="button">Sign up user</button>
            </Link>
        </div>
    )
}