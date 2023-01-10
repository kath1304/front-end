import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useForm} from "react-hook-form";
import {useNavigate, Link} from "react-router-dom";


export default function ShowDatabase() {
    // const navigate = useNavigate()
    const token = localStorage.getItem('authentication')
    /*let verify = axios.get('http://localhost:3001/validate', {headers: {'authorization': token}})
    if (!verify) {
        return 404
    }
    console.log(token)
     */


    let result;
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers= () => {
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
                                    <td><Link to={"/deleteUser"}><button>delete</button></Link></td>
                                    <td><Link to={"/modifyUser"}><button>modify</button></Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}