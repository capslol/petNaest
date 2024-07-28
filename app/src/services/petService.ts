// productService.ts
import axios from 'axios';
import {createPetData, Pet} from '../types/data';
import {getUserData} from "./authService";
import transformPetData from "./transformPetData";

const apiUrl = 'http://localhost:1337/api';



export const getPets = async (): Promise<Pet[]> => {
    const token = localStorage.getItem('accessToken');

    const response = await axios.get(`${apiUrl}/pets`,  {
        headers: {
            Authorization: `Bearer ${token}`,
        }})
    console.log(response.data);
    return response.data.data.map((item: any) => transformPetData(item));
}

export const createPet = async ({name , breed}: createPetData)  => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');


    try {
        const response = await axios.post(
            `${apiUrl}/pet`,
            {name, breed}, // Тело запроса должно содержать корректную структуру для обновления корзины
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
};



