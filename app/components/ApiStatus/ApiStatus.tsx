'use client';



import { JSX, useEffect, useState } from "react";


export default function ApiStatus(): JSX.Element {

    const [isApiOnline, setIsApiOnline] = useState<boolean>(false);

    useEffect(() => {
        const checkApiStatus = async () => {
            try {
                const response = await fetch("https://rickandmortyapi.com/api/character");
                if (response.ok) {
                    setIsApiOnline(true);
                }
            } catch (error) {
                console.error(error);
            }
        }

        checkApiStatus();
    }, []);

    return (
        <div className="api-status">
            <p>{isApiOnline ? "API is online" : "API is offline"}</p>
        </div>
    );
};