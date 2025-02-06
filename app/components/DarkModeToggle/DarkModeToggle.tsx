import Image from "next/image";
import { JSX, useEffect, useState } from "react";

export default function DarkModeToggle(): JSX.Element {

    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        const themeToggle = document.getElementById('theme-toggle') as HTMLInputElement;

        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                setTheme('dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                setTheme('light');
            }
        });

        if (localStorage.getItem('theme') === 'dark') {
            themeToggle.checked = true;
            document.documentElement.classList.add('dark');
            setTheme('dark');
        }
    }
    , [theme]);

    return (
        <>
            <div className="absolute top-4 right-4" 
            data-tg-order="2"
            data-tg-tour="Você também é do lado sombrio da força? Ative e desative o modo escuro aqui!">
                <input type="checkbox" id="theme-toggle" className="hidden" />
                <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                    <Image src="/dark_mode.webp"  alt="dark mode" className={`w-8 h-8 ml-2 ${theme == 'dark' ? 'bg-white rounded-3xl' : ''}`} />
                </label>
            </div>

        </>
    );
}