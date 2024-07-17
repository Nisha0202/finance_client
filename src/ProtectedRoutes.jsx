import React from 'react';
import { Route, useNavigate, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


const ProtectedRoutes = ({ component: Component, role: Role, ...rest }) => {
  const token = localStorage.getItem('usertoken');
//   const role = localStorage.getItem('role') || (token && jwtDecode(token).role);

     return token ? <Component {...rest} /> : <Navigate to="/login" />;


 
};


export default ProtectedRoutes ;



