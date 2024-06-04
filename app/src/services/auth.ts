import axios from 'axios';
import {Pet, User} from "../types/data";

const API_URL = 'http://localhost:5000';

interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string; // или другие данные об успешной аутентификации
    id: string;
    user: User,
    error: object
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, data)
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('userId', response.data.user.id);
    return response.data;
};

export const getUserData = async () => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getPetData = async (petId: number | undefined) => {

    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const user = response.data;
    const pet = user.pets.filter((pet: Pet) => pet.id === petId);
    if (!pet) {
        throw new Error('Pet not found');
    }
    return pet;
};


export const registerUser = async (user: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
};
