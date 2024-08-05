import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";

const NotFound = () => {
    console.log('NotFound rendered')

    const navigate = useNavigate()
    return (
        <>
            Page not found go <span onClick={() => navigate('/')}>HOME</span>
        </>
    );
};

export default NotFound;