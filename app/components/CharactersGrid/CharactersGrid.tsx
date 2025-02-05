'use client';

import { Character } from "@/api-client/Character";
import { JSX, useEffect, useState } from "react";
import Card from "../Card/Card";

interface CharactersGridProps {
    characters: Character[];
    loading: boolean;
}

export default function CharactersGrid({ characters, loading }: CharactersGridProps): JSX.Element {


    return (
        <>
            {loading && <div className="w-full col-span-3 grid grid-cols-5 gap-4">
                <div className="animate-pulse flex flex-col space-y-4">
                    <div className="h-52 bg-gray-200"></div>
                    <div className="h-4 bg-gray-200"></div>
                    <div className="h-4 bg-gray-200"></div>
                    <div className="h-4 bg-gray-200"></div>
                </div>
                <div className="animate-pulse flex flex-col space-y-4">
                    <div className="h-52 bg-gray-200"></div>
                    <div className="h-4 bg-gray-200"></div>
                    <div className="h-4 bg-gray-200"></div>
                    <div className="h-4 bg-gray-200"></div>
                </div>
                <div className="animate-pulse flex flex-col space-y-4">
                    <div className="h-52 bg-gray-200"></div>
                    <div className="h-4 bg-gray-200"></div>
                    <div className="h-4 bg-gray-200"></div>
                    <div className="h-4 bg-gray-200"></div>
                </div>
            </div>
            }
            {!loading && <div className="w-full col-span-3 grid grid-cols-3 gap-4 h-[80vh] overflow-y-auto overflow-x-hidden">
                {characters.map((character) => (
                    <Card key={character.id} name={character.name} image={character.image} status={character.status} species={character.species} location={character.location} origin={character.origin} />
                ))}
            </div>
            }
        </>
    );
};