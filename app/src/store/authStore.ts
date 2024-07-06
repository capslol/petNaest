import {createEvent, createStore, createEffect, sample} from 'effector';
import {User} from "../types/data";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const API_URL = 'http://localhost:5000';

interface LoginData {
    email: string;
    password: string;
}
export interface LoginResponse {
    accessToken: string;
    id: string;
    user: User,
    error: object
}

const accessTokenFromStorage = localStorage.getItem('accessToken')
export const loginFx = createEffect(async (data: LoginData, ):Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userId', response.data.user.id);
        return response.data;
    } catch (error) {
        throw error;
    }
})
export const logout = createEvent()
export const $accessToken = createStore(accessTokenFromStorage)
    .on(loginFx.doneData, (_, payload) => payload.accessToken)
    .reset(logout)
export const $isAuthenticated = createStore<boolean>(!!accessTokenFromStorage)
    .on(loginFx.doneData, () => true)
    .reset(logout)

sample({
    clock: logout,
    fn: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
    }
})



