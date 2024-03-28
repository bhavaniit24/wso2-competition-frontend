import { AIMessage, Category, IApp, Message, Prompt, UseApp } from '@/shared';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const URL = process.env.NEXT_PUBLIC_BACKEND_LINK!;

class ApiService {
    private static instance: ApiService;
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string = URL) {
        this.axiosInstance = axios.create({
            baseURL,
        });
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }

        return ApiService.instance;
    }

    private async axiosRequest<T>(method: string, url: string, data?: any): Promise<T | null> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance({
                method,
                url,
                data,
            });
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async getPrompt(id: string): Promise<Prompt | null> {
        return this.axiosRequest<Prompt>('get', `/prompts/${id}`);
    }

    async createPrompt(text: string, categories: string[]): Promise<any> {
        const requestData = {
            text,
            categories,
            status: 'CREATED',
        };

        return this.axiosRequest<any>('post', '/prompts', requestData);
    }

    async updatePrompt(id: string, text: string, categories: string[]): Promise<any> {
        const requestData = {
            text,
            categories,
            status: 'UPDATED',
        };

        return this.axiosRequest<any>('put', `/prompts/${id}`, requestData);
    }

    async createCategory(category: string): Promise<any> {
        const requestData = {
            name: category,
        };

        return this.axiosRequest<any>('post', '/categories', requestData);
    }

    async createApp(
        name: string,
        description: string,
        icon: string,
        categories: string[],
        messages: Message[]
    ): Promise<any> {
        const requestData = {
            name,
            description,
            icon,
            categories,
            messages,
        };

        return this.axiosRequest<any>('post', '/apps', requestData);
    }

    async searchPrompts(cid?: string, q?: string): Promise<Prompt[]> {
        let queryString = '';

        if (q) queryString += `q=${q}&`;
        if (cid) queryString += `cid=${cid}&`;

        const params = queryString ? '?' + queryString.slice(0, -1) : '';
        const url = `/prompts/search${params}`;

        return this.axiosRequest<any>('get', url);
    }

    async searchApps(cid?: string, q?: string): Promise<IApp[]> {
        let queryString = '';

        if (q) queryString += `q=${q}&`;
        if (cid) queryString += `cid=${cid}&`;

        const params = queryString ? '?' + queryString.slice(0, -1) : '';
        const url = `/apps/search${params}`;

        return this.axiosRequest<any>('get', url);
    }

    async getAllCategories(): Promise<Category[] | null> {
        return this.axiosRequest<Category[]>('get', '/categories');
    }

    async streamChat(message: AIMessage): Promise<any> {
        try {
            const url = `${URL}/chat/stream`;
            const response = await this.axiosInstance.post(url, message, { responseType: 'stream' });
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async chat(message: AIMessage): Promise<any> {
        return this.axiosRequest<any>('post', '/chat', message);
    }

    async useApp(app: UseApp): Promise<any> {
        return this.axiosRequest<any>('post', '/apps/use', app);
    }

    async validateUser(email: string, password: string): Promise<any> {
        return this.axiosRequest<any>('post', '/users/validate', {
            email,
            password,
        });
    }
}

export { ApiService };
