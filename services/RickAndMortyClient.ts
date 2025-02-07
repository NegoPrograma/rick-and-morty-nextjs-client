import { Filters } from "@/types/Filters";

export class RickAndMortyClient {
    static instance: RickAndMortyClient;
    baseUrl: string = process.env.API_URL || "https://rickandmortyapi.com/api/character";
    constructor() { }

    static getInstance(): RickAndMortyClient {
        if (!RickAndMortyClient.instance) {
            RickAndMortyClient.instance = new RickAndMortyClient();
        }
        return RickAndMortyClient.instance;
    }

    async search(filters: Filters) {
        let url = `${this.baseUrl}?${new URLSearchParams(filters as Record<string,string>).toString()}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            return data;

        } catch (error) {
            console.error(error);
            return [];
        }
    }

}