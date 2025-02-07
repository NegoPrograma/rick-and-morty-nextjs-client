'use client';

import Image from "next/image";
import { JSX } from "react";


interface SideFilterOptionProps {
    name: string;
    icon: string;
    handler: () => void;
}

export default function SideFilterOption({name, icon, handler}: SideFilterOptionProps): JSX.Element {


    const internalHandler = () => {
        const filterButton = document.getElementById(`${name}-side-filter`);
        const otherSideFilters = document.querySelectorAll('.side-filter');

        otherSideFilters.forEach((filter) => {
            if(filter.id !== `${name}-side-filter`){
                filter.classList.remove('active');
            }
        });

        if(filterButton?.classList.contains('active')){
            filterButton.classList.remove('active');
            handler();
            return;
        }

        filterButton?.classList.add('active');
        handler();
    }

    return (
        <li onClick={internalHandler} id={`${name}-side-filter`} className="side-filter shadow-md w-full h-10 dark:bg-gray-800 bg-[#cad4dd] dark:text-gray-300 text-gray-700 dark:hover:bg-gray-500 hover:bg-[#34373a] hover:text-white rounded-md flex items-center justify-between cursor-pointer mt-2 px-5">
            <span className=" font-bold ">{name}</span>
            <Image src={icon} width={32} height={32}  alt="icon" className="ml-2 rounded-xl" />
        </li>
    );
};