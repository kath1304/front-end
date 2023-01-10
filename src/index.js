import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from "./routes/login.jsx";
import Admin from "./routes/admin.jsx";
import User from "./routes/user.jsx";
import ShowUsers from "./routes/showUsers.jsx";
import Signup from "./routes/signup.jsx";
import ModifyUser from "./routes/modifyUser.jsx";
import DeleteUser from "./routes/deleteUser.jsx";
import CheckUser from "./routes/checkUser.jsx";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/admin",
        element: <Admin />
    },
    {
        path: "/user",
        element: <User />
    },
    {
        path: "/showDatabase",
        element: <ShowUsers />
    },
    {
        path: "/sign",
        element: <Signup />
    },
    {
        path: "/modifyUser",
        element: <ModifyUser />
    },
    {
        path: "/deleteUser",
        element: <DeleteUser />
    },
    {
        path: "/checkUser",
        element: <CheckUser />
    },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
