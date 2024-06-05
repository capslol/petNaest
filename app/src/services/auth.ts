import axios, {AxiosResponse} from 'axios';
import {Document, Pet, Plan, User, Vaccine} from "../types/data";

const API_URL = 'http://localhost:5000';

interface LoginData {
    email: string;
    password: string;
}

interface PetUpdateData {
    id: number;
    name: string;
    breed: string;
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

export const getPetData = async (id: number | undefined) => {

    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const user = response.data;
    const pet = user.pets.find((pet: Pet) => pet.id === id);
    if (!pet) {
        throw new Error('Pet not found');
    }
    return pet;
};

export const updatePetData = async ({ id, name, breed }: PetUpdateData): Promise<User> => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');


    // Отправляем обновленные данные пользователя на сервер
    const updateResponse = await axios.put(`${API_URL}/users/id=${id}ownerId=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return updateResponse.data;
};


export const registerUser = async (user: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
};
