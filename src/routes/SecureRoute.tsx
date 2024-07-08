import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUnit} from 'effector-react';
import { $isAuthenticated } from '../store/authStore';

const SecureRoute = () => {
    const isAuthenticated = useUnit($isAuthenticated);

    $isAuthenticated.watch((data) => {
        console.log(data)
    })
    const navigate = useNavigate();
    console.log('in secure')

    useEffect(() => {
        console.log('isAuthenticated in SecureRoute:', isAuthenticated); // Отладка
        if (!isAuthenticated) {
            navigate('/login');
        }
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated]);

    return isAuthenticated ? <Outlet /> : null;
};

export default SecureRoute;
