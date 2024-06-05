import {  FC, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import GlobalStyles from '../styles/globalStyles';
import { AuthProvider } from "../contexts/AuthContext";
import SecureRoute from "../routes/SecureRoute";
import PetCard from "./PetCard";
import NotFound from "./NotFound";

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
                        <Route path="/notFound" element={<NotFound/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to="/notFound"/>}/>
                </Routes>
            </AuthProvider>
        </ChakraProvider>

    );
};

export default App;