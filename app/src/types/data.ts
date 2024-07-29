export interface User {
    id: string;
    username: string;
    email: string;
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string
}

export interface Pet {
    id: number;
    name: string;
    age: number;
    breed: string;
    image: string;
    documents: Document[];
    vaccines: Vaccine[];
    plans: Plan[]
}
export interface Vaccine {
    name: string;
}

export interface Document {
    fileName: string;
}
export interface Plan {
    name: string;
    date: string;
    location: string;
}

export interface RegistrationData {
    username: string;
    email: string;
    password: string;
}
export interface LoginResponse {
    jwt: string;
    user: User;
}

export interface LoginData {
    email: string;
    password: string;
}



export interface createPetData {
    name: string;
    breed: string;
}
export interface PetUpdateData {
    name: string;
    id: number;
    breed: string;
}
