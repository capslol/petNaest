export interface Vaccine {
    name: string;
}

export interface Document {
    fileName: string;
}

export interface Pet {
    id: number;
    name: string;
    age: number;
    breed: string;
    documents: Document[];
    vaccines: Vaccine[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    pets: Pet[];
}

export interface UsersResponse {
    users: User[];
}