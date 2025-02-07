'use client';

import { RickAndMortyClient } from "@/services/RickAndMortyClient";
import CharactersGrid from "@/components/CharactersGrid/CharactersGrid";
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import FilterList from "@/components/FilterList/FilterList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import SideFilterOption from "@/components/SideFilterOption/SideFilterOption";
import { Character } from "@/types/Character";
import { useEffect, useMemo, useState } from "react";
import { Filters } from "@/types/Filters";
import HealthCheck from "@/components/HealthCheck/HealthCheck";

declare global {
  interface Window {
    tourguide;
  }
}

export default function Home() {

  const apiClient = useMemo(() => new RickAndMortyClient(), []);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    if (typeof window !== 'undefined' && window.tourguide && localStorage.getItem('tourguide') === null) {
      const tg = new window.tourguide.TourGuideClient();
      tg.start();
      localStorage.setItem('tourguide', 'true');
    }

  }, []);

  useEffect(() => {

    if (input) {
      filters.name = input;
    }
    setLoading(() => true);

    filters.page = currentPage;

    const timeoutId: NodeJS.Timeout = setTimeout(async () => {

      await apiClient.search(filters).then((data) => {
        const characters = data?.results?.map((character) => new Character(character.id, character.name, character.status, character.species, character.type, character?.location?.name || 'unknown', character.image, character?.origin?.name || 'unknown'));
        if (characters?.length > 0) {
          setCharacters(characters);
          setTotalPages(data.info.pages);
        } else {
          setCharacters([]);
          setTotalPages(1);
        }

        setLoading(() => false);
      }).catch((error) => {
        console.log(error)
        setLoading(() => false);
      })
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };

  }, [currentPage, input, filters, apiClient]);


  const resetFilters = useMemo(() => {
    return () => {
      setInput("");
      setFilters({});
      setCurrentPage(1);
    };
  }, []);


  const filterListHandler = useMemo(() => {
    return (filter: string, value: string | null) => {
      setCurrentPage(1);

      if (value === null) {

        setFilters((prev) => {
          const newFilters = { ...prev };
          delete newFilters[filter];
          return newFilters;
        });

        return;
      }

      setFilters({ ...filters, [filter]: value });
    };
  }, [filters]);


  const untoggleFilter = useMemo(() => {
    return (filter: string) => {

      if (filter === "name" && ["rick", "morty"].includes(filters?.name as string)) {
        setFilters((prev) => {
          const newFilters = { ...prev };
          delete newFilters.name;
          return newFilters;
        });
        return;
      }

      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters[filter];
        return newFilters;
      }
      );
    };
  }, []);

  return (
    <>
      <DarkModeToggle />
      <div className="w-[80%] flex flex-col">

        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center mt-5 dark:text-white text-black">Rick and Morty Explorer</h1>
          <HealthCheck />
        </div>

        <div className="w-full mx-auto grid grid-cols-8 gap-3 mt-1">

          <SearchBar
            inputHandler={setInput}
            inputState={input}
          />
          <div className="w-full col-span-8 md:col-span-2"
            data-tg-order="3"
            data-tg-tour="Filtre os personagens por nome, espécie, gênero e status.
            Os filtros ativos estarão destacados com a cor azul. Os filtros de gênero e status podem ser combinados (Homens + Sumiram, por exemplo), inclusive com a busca por nome e nossos 4 filtros destacados aqui.
            No entanto, a combinação máxima de filtros é de 4 filtros. (Nome + Ricks/Mortys/Aliens/Humanos + Status + Gênero)">
            <ul>
              <SideFilterOption name="Ricks"
                icon="/rick.webp"

                handler={() => {

                  setCurrentPage(1);
                  if (filters.name === "rick") {
                    untoggleFilter("name");
                    return;
                  }
                  
                  setFilters({ ...filters, name: "rick" })
                  untoggleFilter("species");
                }}
              />
              <SideFilterOption name="Mortys"
                icon="/morty.webp"
                handler={() => {

                  setCurrentPage(1);
                  if (filters.name === "morty") {
                    untoggleFilter("name");
                    return;
                  }
                  
                  setFilters({ ...filters, name: "morty" })
                  untoggleFilter("species");
                }}
              />
              <SideFilterOption name="Humanos"
                icon="/beth.webp"
                handler={() => {

                  setCurrentPage(1);

                  if (filters.species === "human") {
                    untoggleFilter("species");
                    return;
                  }

                 
                  setFilters({ ...filters, species: "human" })
                  untoggleFilter("name");
                }} />
              <SideFilterOption name="Aliens" icon="/rap_head.webp"
                handler={() => {

                  setCurrentPage(1);

                  if (filters.species === "alien") {
                    untoggleFilter("species");
                    return;
                  }

                  
                  setFilters({ ...filters, name: "", species: "alien" })
                  untoggleFilter("name");

                }}
              />
            </ul>

            <FilterList resetFiltersHandler={resetFilters} setFilterHandler={filterListHandler} />

          </div>
          <CharactersGrid loading={loading} characters={characters} />

        </div>

        <Pagination currentPage={currentPage}
          totalPages={totalPages}
          nextPage={() => setCurrentPage((prev) => prev + 1)}
          previousPage={() => setCurrentPage((prev) => prev - 1)}
          setPage={(page: number) => setCurrentPage(page)}
        />

      </div>
    </>
  );
}
