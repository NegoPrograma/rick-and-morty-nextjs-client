'use client';

import { JSX } from "react";

interface SearchBarProps {
    inputState: string,
    inputHandler: (input: string) => void,
}

export default function SearchBar({ inputHandler, inputState }: SearchBarProps): JSX.Element {

    return (
        <div 
        data-tg-order="1"
        data-tg-tour="Seja bem-vindo ao Rick and Morty Explorer! Aqui você pode pesquisar por personagens, filtrar por gênero e status, e navegar entre as páginas. 
        Para começar, basta digitar o nome de um personagem no campo de busca."
        
        className="w-full col-span-8 flex">
            <div className="w-full flex flex-col">
                <input className=" block w-full h-10 rounded-md pl-2 bg-[#cad4dd] hover:bg-[#b7c3cf]  border-s-[#8e9194] " type="text" placeholder="Quem você procura?" value={inputState} onChange={(e) => inputHandler(e.target.value)} />
            </div>
        </div>
    );
};