import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";


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

    return (
        <div className="App">
            <h2>
                Tabella degli utenti connessi
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
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}