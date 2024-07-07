import React, { useEffect } from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $isAuthenticated } from '../store/authStore';

const SecureRoute = () => {
    const isAuthenticated = useUnit($isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('secure')
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated]);

    return isAuthenticated ? <Outlet /> : null;
};

export default SecureRoute;
