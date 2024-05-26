import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login as loginService, LoginResponse } from '../services/auth';
import {useNavigate} from "react-router-dom";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem('accessToken');

    const navigate = useNavigate();

    const mutation = useMutation<LoginResponse, unknown, { email: string; password: string }>({
        mutationFn: loginService,
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.accessToken);
            setIsAuthenticated(true);
            navigate('/')
        },
    });

    const login = (email: string, password: string) => {
        mutation.mutate({ email, password });
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
