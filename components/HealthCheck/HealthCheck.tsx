import React, { useState, useEffect, JSX } from 'react';

export default function HealthCheck(): JSX.Element {
    const [status, setStatus] = useState<'green' | 'red'>('green');
    const [pulse, setPulse] = useState(false);
    const url = process.env.API_URL || 'https://rickandmortyapi.com/api/character/1';

    const fetchStatus = async () => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                setStatus('green');
            } else {
                setStatus('red');
                console.error(`Request to ${url} failed with status: ${response.status}`);
            }
        } catch (error) {
            setStatus('red');
            console.error(`Error fetching ${url}:`, error);
        } finally {
            setPulse(true);
            setTimeout(() => setPulse(false), 500);
        }
    };

    useEffect(() => {
        fetchStatus();

        const intervalId = setInterval(fetchStatus, 15000);

        return () => clearInterval(intervalId);
    }, [url]);

    return (
        <div className="z-50 flex items-center my-1">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg  border border-gray-200 dark:border-gray-700">
                <div className="flex items-center  justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-bold cursor-default">
                        API Status
                    </span>
                    <span
                        className={`inline-block w-3 h-3 rounded-full ml-2 ${status === 'green' ? 'bg-green-500' : 'bg-red-500'
                            } shadow-md ${pulse ? 'animate-pulse' : ''}`}
                    ></span>
                </div>
            </div>
            <div className="ml-5 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                <a href="/tests/index.html" target='_blank' className="text-blue-500 dark:text-blue-300 text-sm">Testes</a>
            </div>
        </div>
    );
}