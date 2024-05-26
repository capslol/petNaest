export type TodoState = 'all' | 'open' | 'completed'
export interface ITodo {
    id: number;
    title: string;
    completed: boolean;
}