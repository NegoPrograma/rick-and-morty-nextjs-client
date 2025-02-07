'use client';

import { JSX } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    nextPage: () => void;
    previousPage: () => void;
    setPage: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, nextPage, previousPage, setPage }: PaginationProps): JSX.Element | false | null | "" {

    const maxPagesToShow = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return ((totalPages > 1 && localStorage.getItem('tourguide')) && (
        <div className="flex items-center justify-center gap-2 mt-5 font-bold" 
        data-tg-order="5"
        data-tg-tour="Aqui você pode navegar entre as páginas de personagens encontrados na sua busca. A paginação é reiniciada a cada busca ou filtro aplicado.">
            {currentPage > 1 && (
                <button
                    onClick={previousPage}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8px" height="24px" viewBox="0 0 1024 1024" version="1.1"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"/></svg>
                </button>
            )}

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => setPage(1)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        1
                    </button>
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setPage(page)}
                    className={`px-4 py-2 rounded ${page === currentPage
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {page}
                </button>
            ))}

            {totalPages > maxPagesToShow && endPage < totalPages && (
                <>
                    <span className="mx-2 dark:text-white">...</span>
                    <button
                        onClick={() => setPage(totalPages)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {currentPage < totalPages && (
                <button
                    onClick={nextPage}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="24px" width="8px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xmlSpace="preserve">
                        <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z" />
                    </svg>
                </button>
            )}
        </div>
    ))
}