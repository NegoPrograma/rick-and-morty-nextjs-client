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
        <li onClick={internalHandler} id={`${name}-side-filter`} className="side-filter w-full h-10 dark:bg-[#f4f5f5] bg-[#0d241a] dark:hover:bg-[#b7c3cf] hover:bg-[#0d151d] rounded-md flex items-center justify-between cursor-pointer mt-2 px-5">
            <span className=" font-bold dark:text-gray-700 text-white">{name}</span>
            <Image src={icon} alt="icon" className="w-8 h-8 ml-2 rounded-xl" />
        </li>
    );
};