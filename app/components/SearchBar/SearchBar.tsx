'use client';

import { Status } from "@/api-client/RickAndMortyClient";
import { JSX } from "react";

interface SearchBarProps {
    resetFiltersHandler: () => void,
    filterHandler: (status: Status|null) => void,
    inputHandler: (input: string) => void,
}

export default function SearchBar({ filterHandler,inputHandler,resetFiltersHandler }: SearchBarProps): JSX.Element {


    return (
        <div className="w-full col-span-4 flex">
            <div className="w-5/6">
                <input className=" block w-full h-10 rounded-md pl-2 bg-[#cad4dd] hover:bg-[#b7c3cf]  border-s-[#8e9194] " type="text" placeholder="Quem você procura?" onChange={(e) => inputHandler(e.target.value)} />
                <div className="flex gap-2 mt-2 justify-end">
                    <span className="text-sm font-medium text-green-900">Status: </span>
                    <ul className="flex gap-2 ">
                        <li>
                            <input type="radio" id="status-alive" name="status" onChange={(e) => filterHandler(e.target.checked ? Status.Alive : null)} />
                            <label htmlFor="status-alive">Vivo</label>
                        </li>
                        <li>
                            <input type="radio" id="status-dead" name="status" onChange={(e) => filterHandler(e.target.checked ? Status.Dead : null)} />
                            <label htmlFor="status-dead">Morto</label>
                        </li>
                        <li>
                            <input type="radio" id="status-unknown" name="status"  onChange={(e) => filterHandler(e.target.checked ? Status.Unknown : null)} />
                            <label htmlFor="status-unknown">Desconhecido</label>
                        </li>
                    </ul>

                    <button className="text-sm font-medium text-red-900" onClick={resetFiltersHandler}>Limpar</button>
                </div>


            </div>
            <button
            type="submit" className="p-1 h-10 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <span>Buscar</span>
            </button>
        </div>
    );
};