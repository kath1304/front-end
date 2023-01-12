import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useForm} from "react-hook-form";
import {useNavigate, Link, useLocation} from "react-router-dom";

export default function CheckUser() {

    const token = localStorage.getItem('authentication')
    const location = useLocation();


    const [user, setUser] = useState([]);
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        axios
            .get(`http://localhost:3001/users/${location.state.user}`, {headers: {'authorization': token}})
            .then((res) => {
                console.log(res);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="App">
            <h2>
                E' stato creato l'utente con i seguenti campi
            </h2>

            <div>{user?.username}</div>
            <div>{user?.firstname}</div>
            <div>{user?.lastname}</div>
            <div>{user?.email}</div>
            <div>{user?.role_name}</div>
        </div>
    );


}