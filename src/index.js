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
import Root from "./routes/root";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/paths",
        element: <Root />,
        children: [
            {
                path: "/paths/admin",
                element: <Admin />
            },
            {
                path: "/paths/user",
                element: <User />
            },
            {
                path: "/paths/showDatabase",
                element: <ShowUsers />
            },
            {
                path: "/paths/sign",
                element: <Signup />
            },
            {
                path: "/paths/modifyUser",
                element: <ModifyUser />
            },
            {
                path: "/paths/deleteUser",
                element: <DeleteUser />
            },
            {
                path: "/paths/checkUser",
                element: <CheckUser />
            },
        ],
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
