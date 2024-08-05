import axios from 'axios';
import {createPetData, Pet, PetUpdateData} from '../types/data';
import {getUserData} from "./authService";
import transformPetData from "./transformPetData";

const apiUrl = 'http://localhost:1337/api';



export const getPets = async (): Promise<Pet[]> => {
    const token = localStorage.getItem('accessToken');

    const response = await axios.get(`${apiUrl}/pets?populate=image`,  {
        headers: {
            Authorization: `Bearer ${token}`,
        }})
    return response.data.data.map((item: any) => transformPetData(item));
}

export const getPet = async (petId: number | null) => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const url = `${apiUrl}/pets/${petId}?populate=image`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return transformPetData(response.data.data)
};

export const createPet = async ({name , breed}: createPetData)  => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');

    try {
        const response = await axios.post(
            `${apiUrl}/pets`,
            {data: {name, breed}}, // Тело запроса должно содержать корректную структуру для обновления корзины
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return response.data;
    } catch (error) {
        console.error('Error creating pet:', error);
        throw error;
    }
};

export const updatePetData = async ({ id, name, breed }: PetUpdateData): Promise<Pet> => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    try {
        const updatedPetData = {
            data: {
                id,
                name,
                breed,
            }
        };

        // Отправляем обновленные данные питомца на сервер
        const updateResponse = await axios.put(`${apiUrl}/pets/${id}`, updatedPetData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return updateResponse.data;
    } catch (error) {
        console.error('Error updating pet data:', error);
        throw error;
    }
};

export const deletePet = async (petId: number | null)  => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');

    try {
        const response = await axios.delete(
            `${apiUrl}/pets/${petId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return response.data;
    } catch (error) {
        console.error('Error creating pet:', error);
        throw error;
    }
};



