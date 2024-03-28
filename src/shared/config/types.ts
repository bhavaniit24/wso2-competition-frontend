export interface NavDataTypes {
    name: string;
    path: string;
    active: boolean;
}

export interface SelectOption {
    value: any;
    label: any;
}

export interface Prompt {
    id: string;
    text: string;
    status: string;
    categories: Category[];
}

export interface Category {
    id: string;
    name: string;
}

export interface Variable {
    id: string;
    content: string;
    type: string;
}

export interface Message {
    role: string;
    content: string;
    type: string;
    variables: Variable[];
}

export interface IApp {
    id: string;
    name: string;
    description: string;
    icon: string;
    categories: Category[];
    messages: Message[];
}

export interface AIMessage {
    content: string;
    model: string;
}

export enum Author {
    AI = 'Bhavan AI',
    USER = 'User',
}

export type IChatMessage = {
    author: Author;
    content: string;
};

export interface UseVariable {
    id: string;
    content: string;
}

export interface UseApp {
    app_id: string;
    variables: UseVariable[];
}
