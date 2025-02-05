import { Status } from "./RickAndMortyClient";

export class Character {

    constructor(id: number, name: string, status: Status, species: string, type: string, location: string,image: string, origin: string) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.species = species;
        this.type = type;
        this.location = location;
        this.image = image;
        this.origin = origin;
    }

    id: number;
    name: string;
    status: Status;
    species: string;
    type: string;
    location: string;
    image: string;
    origin: string;
}