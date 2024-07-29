import axios from 'axios';
import {createPetData, Pet, PetUpdateData} from '../types/data';
import {getUserData} from "./authService";
import transformPetData from "./transformPetData";

const apiUrl = 'http://localhost:1337/api';





export const getPlan = async (petId: number | undefined) => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const url = `${apiUrl}/plans?filters[pet_id][$eq]=${petId}`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data.data.map((item: any) => transformPetData(item)))
    return response.data.data.map((item: any) => transformPetData(item));
};

export const createPlan = async ({name , breed}: createPetData)  => {
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

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error creating pet:', error);
        throw error;
    }
};

export const updatePlan = async ({ id, name, breed }: PetUpdateData): Promise<Pet> => {
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

export const deletePlan = async (petId: number | null)  => {
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

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error creating pet:', error);
        throw error;
    }
};



