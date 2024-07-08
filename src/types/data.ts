export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    pets: Pet[];
}

export interface PetUpdateData {
    id: number;
    name: string;
    age: number;
    breed: string;
    documents: Document[];
    vaccines: Vaccine[];
    plans: Plan[];
}

export interface Pet {
    id: number;
    name: string;
    age: number;
    breed: string;
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





export interface UsersResponse {
    users: User[];
}