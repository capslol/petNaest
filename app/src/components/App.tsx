import React, {FC, useEffect, useState} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import GlobalStyles from '../styles/globalStyles';
import {AuthProvider, useAuth} from "../contexts/AuthContext";
import SecureRoute from "../routes/SecureRoute";

const App: FC = () => {
    return (
        <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<SecureRoute />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
        </AuthProvider>
    );
};

export default App;