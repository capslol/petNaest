import axios from 'axios';
import {LoginData, LoginResponse, RegistrationData, User} from "../types/data"


const apiUrl = 'http://localhost:1337/api';

export const getUserData = async () => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`${apiUrl}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data)
    return response.data;
};




export const registerUser = async (userData: RegistrationData): Promise<boolean> => {
    try {

        const response = await axios.post(`${apiUrl}/auth/local/register`, userData);

        if (response.status === 200) {
            console.log('Пользователь успешно зарегистрирован:', response.data);
            return true;
        } else {
            console.error('Произошла ошибка при регистрации:', response.data);
            return false;
        }
    } catch (error) {
        console.error('Произошла ошибка при выполнении запроса:', error);
        return false;
    }
};

export const loginService = async ({ email, password }: LoginData): Promise<LoginResponse> => {
    const apiUrl = 'http://localhost:1337/api/auth/local';
    const response = await axios.post(apiUrl, { identifier: email, password });
    return response.data;
};