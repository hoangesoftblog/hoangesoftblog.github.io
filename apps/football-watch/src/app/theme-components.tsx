'use client'

import clsx from 'clsx';
import { createContext, useState, useContext } from 'react';
import Image from "next/image";


type ThemeType = "dark" | "light";

function SunIcon({className = ""}: {className?: string}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            className={clsx("w-6 h-6", className)}
            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
    )
}

function MoonIcon({className = ""}: {className?: string}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            className={clsx("w-6 h-6", className)}
            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
    )
}

// Todo: Update Type of toggleTheme again
export const ThemeContext = createContext<{ theme: ThemeType, toggleTheme: any }>({
    theme: "light",
    toggleTheme: () => { },
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>("dark");

    console.log("Using ThemeProvider - theme: " + theme);

    return <ThemeContext.Provider value={{ theme, toggleTheme: () => { setTheme(theme === "light" ? "dark" : "light"); } }}>{children}</ThemeContext.Provider>
}

const themeSVG = {
    // sun.svg on Heroicons
    "dark": (<SunIcon className='text-yellow-400'/>),
    // moon.svg on Heroicons
    "light": (<MoonIcon />),
}

export function ThemeButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}
            className={clsx([
                // 'capitalize',
            ])}>
            {themeSVG[theme]}
        </button>
    )
}

export function ThemedMain({ children }: { children: React.ReactNode }) {
    const { theme } = useContext(ThemeContext);

    console.log("Re-rendering Main with theme: " + theme);

    return (
        <div className={clsx([
            { "dark": theme === "dark" },
            "grow"
        ])}>
            <div className="min-h-full dark:text-white dark:bg-slate-700">
                <main className='p-4 mx-auto w-full min-h-full md:container'>
                    {children}
                </main>
            </div>
        </div>
    )
}