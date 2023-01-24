import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from "./routes/login.jsx";
import Admin from "./routes/admin.jsx";
import User from "./routes/user.jsx";
import ShowUsers from "./routes/showUsers.jsx";
import CheckUser from "./routes/checkUser.jsx";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./errorPage";
import RegisterUser from "./routes/registerUser";
import EditUser from "./routes/editUser";

export const addressApi = 'http://10.11.13.97/api'
export const address = 'http://10.11.13.97'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <ErrorPage />
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
                path: "/paths/showUsers",
                element: <ShowUsers />
            },
            {
                path: "/paths/registerUser",
                element: <RegisterUser />
            },
            {
                path: "/paths/editUser",
                element: <EditUser />
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
