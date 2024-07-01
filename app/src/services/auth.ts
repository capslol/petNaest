import axios from 'axios';
import {Pet, User} from "../types/data";
import {useToast} from "@chakra-ui/react";

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

interface PetCreateData {
    name: string;
    breed: string;
    ownerId?: number;
    age?: number;
    documents?: string[];
    vaccines?: string[];
    plans?: string[];
}


export interface LoginResponse {
    accessToken: string; // или другие данные об успешной аутентификации
    id: string;
    user: User,
    error: object
}

export const login = async (data: LoginData): Promise<LoginResponse> => {

    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userId', response.data.user.id);
        return response.data;
    } catch (error) {
        // В случае ошибки показываем всплывающее уведомление об ошибке
        // Перебрасываем ошибку для обработки в месте вызова функции login
        throw error;
    }
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

export const getPetsData = async () => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const url = `${API_URL}/pets?ownerId=${userId}`;


    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const getPet = async (petId: number | null) => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const url = `${API_URL}/pets/${petId}?ownerId=${userId}`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};


export const updatePetData = async ({id, name, breed}: PetUpdateData): Promise<Pet> => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    try {
        // Получаем текущие данные питомца
        const petResponse = await axios.get(`${API_URL}/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Получаем текущий объект питомца
        const currentPetData: Pet = petResponse.data;

        const updatedPetData: Pet = {
            ...currentPetData,
            name: name ?? currentPetData.name,
            breed: breed ?? currentPetData.breed,
        };

        // Отправляем обновленные данные питомца на сервер
        const updateResponse = await axios.put(`${API_URL}/pets/${id}?ownerId=${userId}`, updatedPetData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return updateResponse.data;
    } catch (error) {
        // Обработка ошибок, если нужно
        console.error('Error updating pet data:', error);
        throw error;
    }
};


export const registerUser = async (user: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
};

export const createPet = async (newPetData: PetCreateData) => {
    const token = localStorage.getItem('accessToken');

    const userId: number = parseInt(localStorage.getItem('userId') || '0');

    try {
        const defaultValues: Partial<PetCreateData> = {
            ownerId: userId,
            age: 0.7,
            documents: [],
            vaccines: [],
            plans: [],
        };
        const dataToSend = { ...defaultValues, ...newPetData };
        const response = await axios.post(`${API_URL}/pets`, dataToSend , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Возвращаем данные созданного питомца
        return response.data;
    } catch (error) {
        console.error('Error creating pet:', error);
        throw new Error('Failed to create pet. Please try again later.');
    }
};

export const deletePet = async (petId: number | null) => {
    const token = localStorage.getItem('accessToken');

    try {
        const response = await axios.delete(`${API_URL}/pets/${petId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting pet:', error);
        throw new Error('Failed to delete pet. Please try again later.');
    }
};

