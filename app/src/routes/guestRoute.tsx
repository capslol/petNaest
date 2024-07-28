import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const GuestRoute = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoute;
