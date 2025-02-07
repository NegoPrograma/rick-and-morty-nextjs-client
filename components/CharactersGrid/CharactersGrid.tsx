'use client';

import { JSX } from "react";
import Card from "../Card/Card";
import Image from "next/image";
import { Character } from "@/types/Character";

interface CharactersGridProps {
    characters: Character[];
    loading: boolean;
}

export default function CharactersGrid({ characters, loading }: CharactersGridProps): JSX.Element {


    return (
        <div className="col-span-8 md:col-span-6"
        data-tg-order="4"
                data-tg-tour="Aqui você pode ver os personagens que foram encontrados na sua busca. Cada card contém informações sobre o personagem, como nome, status, espécie, localização e origem,
                basta passar o mouse sobre o card para ver essas informações. Se não houver personagens, tente outra busca!"
            id="characters-grid"
        >
            {loading && <div  className="w-full grid grid-cols-3 gap-4">
                <div className="animate-pulse flex flex-col space-y-4 col-span-3 md:col-span-1">
                    <div className="h-52 bg-gray-200"></div>
                </div>
                <div className="animate-pulse flex flex-col space-y-4 col-span-3 md:col-span-1">
                    <div className="h-52 bg-gray-200"></div>
                </div>
                <div className="animate-pulse flex flex-col space-y-4 col-span-3 md:col-span-1">
                    <div className="h-52 bg-gray-200"></div>
                </div>
            </div>
            }
            {!loading && <div className="w-full grid grid-cols-4 gap-4 h-[500px]  overflow-x-hidden pr-2"
            >
                {characters?.map((character) => (
                    <div className="col-span-8 md:col-span-1" key={character.id}>
                        <Card
                            charId={character.id}
                            id={character.id}
                            type={character.type}
                            name={character.name}
                            image={character.image}
                            status={character.status}
                            species={character.species}
                            location={character.location}
                            origin={character.origin} />
                    </div>
                ))}

                {!characters?.length  &&
                    <div className=" col-span-8 flex flex-col items-center mt-5 text-center">
                        <Image unoptimized 
                        width={1}
                        height={1}
                        src="/not_found.gif" alt="Rick and Morty" className="notfound" />
                        <p id="not-found-text" className="text-xl font-bold mt-4 dark:text-white">Nenhum personagem encontrado, procure em outra dimensão!</p>
                    </div>
                }
            </div>
            }
        </div>
    );
};