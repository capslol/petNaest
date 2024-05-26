import React, {FC, useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import GlobalStyles from '../styles/globalStyles';

const App: FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            setIsAuthenticated(true)
        } else {
            navigate('/login')
        }
    }, [isAuthenticated])

    const authRoutes = [
        {path: '/register', element: <Register/>},
        {path: '/login', element: <Login/>}
    ]

    const mainRoutes = [
        {path: '/home', element: <Home/>}
    ]

    const routes = isAuthenticated ? mainRoutes : authRoutes

    return (
        <>
        <GlobalStyles/>
            <Routes>
                {routes.map(({path, element}) => <Route path={path} element={element}/>)}
            </Routes>
        </>
    );
};

export default App;