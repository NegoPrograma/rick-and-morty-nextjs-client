'use client';

import { JSX } from "react";


interface SideFilterOptionProps {
    name: string;
    icon: string;
    handler: () => void;
}


export default function SideFilterOption({name, icon, handler}: SideFilterOptionProps): JSX.Element {


    return (
        <li onClick={handler} className="w-full h-10 bg-[#cad4dd] hover:bg-[#b7c3cf] border-s-[#8e9194] rounded-md flex items-center justify-between px-2 cursor-pointer mt-2">
            <span className=" font-medium text-green-900">{name}</span>
            <img src={icon} alt="icon" className="w-6 h-6 ml-2" />
        </li>
    );
};