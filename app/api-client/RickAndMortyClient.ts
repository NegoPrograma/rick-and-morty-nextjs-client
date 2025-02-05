import { Character } from "./Character";


export enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown"
}

export enum Gender {
    FEMALE = "female",
    MALE = "male",
    GENDERLESS = "genderless",
    UNKNOWN = "unknown"
}

export interface Filters {
    name?: string | null;
    status?: Status | null;
    species?: string | null;
    type?: string | null;
    gender?: Gender | null;
    page?: number | null;
}

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