'use client';

import { Character } from "@/api-client/Character";
import { Filters, RickAndMortyClient, Status } from "@/api-client/RickAndMortyClient";
import CharactersGrid from "@/components/CharactersGrid/CharactersGrid";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import SideFilterOption from "@/components/SideFilterOption/SideFilterOption";
import { useEffect, useMemo, useState } from "react";



export default function Home() {

  let apiClient = useMemo(() => new RickAndMortyClient(), []);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPageHandler, setNextPageHandler] = useState<() => void>(() => setCurrentPage((prev) => prev + 1));
  const [previousPageHandler, setPreviousPageHandler] = useState<() => void>(() => setCurrentPage((prev) => prev - 1));
  const [input, setInput] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {

    let timeoutId: NodeJS.Timeout;
    

    if (input) {
      filters.name = input;
    }
    setLoading((prev) => true);

    filters.page = currentPage;


    timeoutId = setTimeout(async () => {

      await apiClient.search(filters).then((data) => {
        const characters = data?.results?.map((character: any) => new Character(character.id, character.name, character.status, character.species, character.type, character.location.name, character.image, character.origin.name));
        if (characters?.length > 0) {
          setCharacters(characters);
          setTotalPages(data.info.pages);
        } else {
          setCharacters([]);
          setTotalPages(1);
        }

        setLoading((prev) => false);
      }).catch((error) => {
        console.error(error);
        setLoading((prev) => false);
      })
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };

  }, [currentPage, input, filters]);


  const resetFilters = useMemo(() => {
    return () => {
      setInput("");
      setFilters({});

      const radioButtons = document.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
      radioButtons.forEach((radio: HTMLInputElement) => {
        radio.checked = false;
      });
    };
  }, []);

  const statusFilterHandler = useMemo(() => (status: Status | null) => setFilters({ ...filters, status: status }), [filters]);

  return (
    <div className="w-full flex flex-col">
      <div className="container mx-auto grid grid-cols-4 gap-3 mt-10">

        <SearchBar
          inputHandler={setInput}
          filterHandler={statusFilterHandler}
          resetFiltersHandler={resetFilters} />
        <div className="w-full col-span-1">
          <ul>
            <SideFilterOption name="Todos os Ricks"
              icon="https://w7.pngwing.com/pngs/255/851/png-transparent-rick-sanchez-morty-smith-sticker-playerunknown-s-battlegrounds-telegram-others-miscellaneous-white-face-thumbnail.png"
              handler={() => setFilters({ name: "rick" })}
            />
            <SideFilterOption name="Todos os Mortys"
              icon="https://e7.pngegg.com/pngimages/440/9/png-clipart-snout-sticker-forehead-rick-and-morty-face-head.png"
              handler={() => setFilters({ name: "morty" })}
            />
            <SideFilterOption name="Humanos"
              icon="https://img.icons8.com/?size=512&id=kq7FzFpkL1J5&format=png"
              handler={() => setFilters({ species: "human" })}
            />
            <SideFilterOption name="Aliens" icon="https://e1.pngegg.com/pngimages/606/288/png-clipart-rick-and-morty-hq-resource-rick-and-morty-character-illustration.png"
              handler={() => setFilters({ species: "alien" })}
            />

          </ul>
          <Pagination currentPage={currentPage}
            totalPages={totalPages}
            nextPage={() => setCurrentPage((prev) => prev + 1)}
            previousPage={() => setCurrentPage((prev) => prev - 1)}
            setPage={(page: number) => setCurrentPage(page)}
          />
        </div>
        <CharactersGrid characters={characters} />
      </div>

    </div>
  );
}
