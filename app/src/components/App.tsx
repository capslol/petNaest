import React, {FC, useEffect, useState} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import GlobalStyles from '../styles/globalStyles';
import {AuthProvider, useAuth} from "../contexts/AuthContext";
import SecureRoute from "../routes/SecureRoute";
import {ChakraProvider} from "@chakra-ui/react";
import PetCard from "./PetCard";

const App: FC = () => {
    return (
        <ChakraProvider>
            <AuthProvider>
                <GlobalStyles/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route element={<SecureRoute/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/petCard/:petId" element={<PetCard/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
            </AuthProvider>
        </ChakraProvider>

    );
};

export default App;