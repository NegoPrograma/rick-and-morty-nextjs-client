import { Filters } from "@/types/Filters";

export class RickAndMortyClient {
    static instance: RickAndMortyClient;
    constructor() { }

    static getInstance(): RickAndMortyClient {
        if (!RickAndMortyClient.instance) {
            RickAndMortyClient.instance = new RickAndMortyClient();
        }
        return RickAndMortyClient.instance;
    }

    async search(filters: Filters) {

        let url = "https://rickandmortyapi.com/api/character/?";

        console.log(new URLSearchParams(url).toString())
        if (filters.name) {
            url += `name=${filters.name}&`;
        }

        if (filters.status) {
            url += `status=${filters.status}&`;
        }

        if (filters.species) {
            url += `species=${filters.species}&`;
        }

        if (filters.type) {
            url += `type=${filters.type}&`;
        }

        if(filters.gender){
            url += `gender=${filters.gender}&`;
        }

        if (filters.page) {
            url += `page=${filters.page}&`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            return data;

        } catch (error) {
            console.error(error);
            return [];
        }
    }

}