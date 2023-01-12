import {useLocation} from 'react-router-dom';

export default function DeleteUser() {

    const location = useLocation();
    return (

        <>

            <div>{location.state.user}</div>

        </>
    )
}