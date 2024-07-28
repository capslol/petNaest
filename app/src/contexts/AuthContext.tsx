// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {LoginResponse, RegistrationData, LoginData} from '../types/data';
import { loginService, registerUser } from '../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    register: (userData: RegistrationData) => Promise<boolean>;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('accessToken');
        return !!token;
    });

    const navigate = useNavigate();

    const mutation = useMutation<LoginResponse, unknown, LoginData>({
        mutationFn: loginService,
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.jwt);
            localStorage.setItem('userId', data.user.id);
            setIsAuthenticated(true);
            navigate('/');
        },
        onError: (error) => {
            console.error('Произошла ошибка при выполнении запроса:', error);
        },
    });

    const login = (email: string, password: string) => {
        mutation.mutate({ email, password });
    };

    const register = async (userData: RegistrationData): Promise<boolean> => {
        return await registerUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, register, login, logout }}>
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
