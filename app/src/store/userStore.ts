import {createEffect, createStore, sample} from 'effector';
import axios from 'axios';
import {User, Pet, PetUpdateData} from '../types/data';
import { $accessToken } from './authStore';

const API_URL = 'http://localhost:5000';



interface PetCreateData {
    name: string;
    breed: string;
    ownerId?: number;
    age?: number;
    documents?: string[];
    vaccines?: string[];
    plans?: string[];
}

export const getUserDataFx = createEffect(  async () => {
    const token = $accessToken.getState()
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
})

export const getPetsDataFx = createEffect( async () => {
    const token = $accessToken.getState()
    const userId = localStorage.getItem('userId');
    const url = `${API_URL}/pets?ownerId=${userId}`;


    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
})

export const getPetFx = createEffect(async (petId: number | null) => {
    const token = $accessToken.getState();
    const userId = localStorage.getItem('userId');
    const response = await axios.get<Pet>(`${API_URL}/pets/${petId}?ownerId=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const createPetFx = createEffect(async (newPetData: PetCreateData): Promise<Pet> => {
    const token = $accessToken.getState();
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const defaultValues: Partial<PetCreateData> = {
        ownerId: userId,
        age: 0.7,
        documents: [],
        vaccines: [],
        plans: [],
    };
    const dataToSend = { ...defaultValues, ...newPetData };
    const response = await axios.post<Pet>(`${API_URL}/pets`, dataToSend, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const updatePetDataFx = createEffect(async (data: Partial<Pet>): Promise<Pet> => {
    const token = $accessToken.getState();
    const userId = localStorage.getItem('userId');
    const response = await axios.put<Pet>(`${API_URL}/pets/${data.id}?ownerId=${userId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});


export const deletePetFx = createEffect(async (petId: number| undefined) => {
    const token = $accessToken.getState();
    const response = await axios.delete(`${API_URL}/pets/${petId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const setCurrentPetIdFx = createEffect((petId: number | null) => petId);




export const $currentPetId = createStore<number | null>(null)
    .on(setCurrentPetIdFx.doneData, (_, petId) => petId);
export const $user = createStore<User | null>(null)
.on(getUserDataFx.doneData, (_, payload) => payload)

export const $pets = createStore<Pet[]>([])
    .on(getPetsDataFx.doneData, (_, payload) => payload)
    .on(createPetFx.doneData, (state, newPet: Pet) => [...state, newPet])

export const $currentPet = createStore<Pet | null>(null)
    .on(getPetFx.doneData, (_, payload) => payload)
    .on(updatePetDataFx.doneData, (_, updatedPet: Pet) => updatedPet)

