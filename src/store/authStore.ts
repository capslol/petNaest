// authStore.js
import { createEvent, createStore, createEffect, sample } from 'effector';
import { User } from "../types/data";
import axios from "axios";
import { useNavigate  } from 'react-router-dom'; // Импортируем navigate для перехода

const API_URL = 'http://localhost:5000';

interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    id: string;
    user: User;
    error?: object; // Optional error field
}

const accessTokenFromStorage = localStorage.getItem('accessToken');

export const registerUserFx = createEffect(async (user: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
});

export const loginFx = createEffect(async (data: LoginData): Promise<LoginResponse> => {
    // const navigate = useNavigate(); // Используем useNavigate для навигации

    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
        console.log('Login successful', response.data); // Отладка
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userId', response.data.user.id);
        // navigate ('/'); // Переход на главную страницу при успешном логине
        return response.data;
    } catch (error) {
        console.error('Login error', error); // Отладка
        throw error;
    }
});

export const logout = createEvent();
export const login = createEvent<LoginData>();

export const $accessToken = createStore(accessTokenFromStorage)
    .on(loginFx.doneData, (_, payload) => {
        console.log('Access token updated', payload.accessToken); // Отладка
        return payload.accessToken;
    })
    .reset(logout);

export const $isAuthenticated = createStore<boolean>(!!accessTokenFromStorage)
    .on(loginFx.doneData, () => {
        console.log('Authenticated'); // Отладка
        return true;
    })
    .reset(logout);


logout.watch(() => {
    console.log('Logged out'); // Отладка
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
});

// Использование sample для связывания login события с loginFx эффектом


// Экспорт для использования в других частях приложения

