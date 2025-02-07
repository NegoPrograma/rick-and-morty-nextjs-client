'use client';

import { Status } from "@/types/Status";
import { JSX } from "react";

interface FilterListProps {
    setFilterHandler: (key: string, value: string | Status | null) => void;
    resetFiltersHandler: () => void;
}

export default function FilterList({ setFilterHandler, resetFiltersHandler }: FilterListProps): JSX.Element {

    const toggleFilterHandler = (filterKey, value, id) => {

        const filterButton = document.getElementById(id);

        const filterButtons = document.getElementsByClassName(filterKey);

        let isDeactivating = false;
        for (let i = 0; i < filterButtons.length; i++) {
            if (filterButtons[i]?.classList.contains('active')) {
                filterButtons[i].classList.remove('active');
                setFilterHandler(filterKey, null);

                if (filterButtons[i] === filterButton) {
                    isDeactivating = true;
                }
            }
        }

        if (isDeactivating) {
            return;
        }

        filterButton?.classList.add('active');
        setFilterHandler(filterKey, value);
    }

    const internalResetFiltersHandler = () => {
        const filterButtons = document.querySelectorAll('.active');
        filterButtons.forEach((button) => {
            button.classList.remove('active');
        });
        resetFiltersHandler();
    }



    return (
        <div className="flex flex-col w-full justify-center items-center gap-4  border-gray-200 py-4 rounded-xl dark:bg-gray-800 bg-[#cad4dd] dark:text-gray-300 text-gray-700 mt-5">
            <div className="w-[90%] flex flex-col gap-2 justify-between font-bold text-white">
                <div className="flex w-full justify-between">
                    <button onClick={() => toggleFilterHandler('gender', 'male', "male-filter")} id="male-filter" className="gender hover:bg-[#266f91] p-2 rounded-md bg-[#2e85ad] shadow-sm w-full  text-xs">Homens</button>
                    <button onClick={() => toggleFilterHandler('gender', 'female', "female-filter")} id="female-filter" className="gender hover:bg-[#6f2b8a] p-2 rounded-md bg-[#9f2da3] shadow-sm w-full ml-2 text-xs">Mulheres</button>
                </div>
                <button onClick={() => toggleFilterHandler('gender', 'genderless', "genderless-filter")} id="genderless-filter" className="gender hover:bg-gray-500 p-2 rounded-md bg-gray-700 min-w-[30%] text-xs">Segredo</button>
            </div>

            <div className=" w-[90%] flex flex-col gap-2 justify-between font-bold text-white">
                <div className="flex w-full justify-between">
                    <button onClick={() => toggleFilterHandler('status', Status.Alive, "alive-filter")} id="alive-filter" className="status hover:bg-[#1e7543] p-2 rounded-md bg-[#1b9b26] shadow-sm w-full  text-xs"> Vivos </button>
                    <button onClick={() => toggleFilterHandler('status', Status.Dead, "dead-filter")} id="dead-filter" className="status hover:bg-[#721e1e] p-2 rounded-md bg-[#a32d2d] shadow-sm w-full ml-2 text-xs">Mortos</button>
                </div>
                <button onClick={() => toggleFilterHandler('status', Status.Unknown, "unknown-filter")} id="unknown-filter" className="status hover:bg-gray-500 p-2 rounded-md bg-gray-700 min-w-[30%] text-xs">Sumiram</button>
            </div>

            <button onClick={internalResetFiltersHandler} className="hover:bg-red-500 p-2 rounded-md bg-red-700 font-bold w-[90%] text-white mx-2">Resetar Filtros</button>

        </div>
    );
};