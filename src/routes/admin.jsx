import {Link} from "react-router-dom";

//aggiungere controllo ruolo
export default function Admin() {
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