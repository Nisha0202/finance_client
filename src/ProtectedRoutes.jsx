import React from 'react';
import { Route, useNavigate, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



const ProtectedRoutes = ({ component: Component, role: Role, ...rest }) => {
    const token = localStorage.getItem('usertoken');
    //   const role = localStorage.getItem('role') || (token && jwtDecode(token).role);
    if (token) {
        const decoded = jwtDecode(token);
        const role = decoded.role;
        console.log('Role:', role);
        return token && role === Role ? <Component {...rest} /> : <Navigate to="/login" />;


    }


    // return token ? <Component {...rest} /> : <Navigate to="/login" />;



};


export default ProtectedRoutes;



