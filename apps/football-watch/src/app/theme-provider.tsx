'use client'

import { createContext, useState, useContext } from 'react'

export const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<string>("dark");
    return <ThemeContext.Provider value={{ theme, toggleTheme: () => {setTheme(theme === "light" ? "dark" : "light");}}}>{children}</ThemeContext.Provider>
}

export function ThemeButton() {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <button className='capitalize' onClick={toggleTheme}>
            {/* <Image src={sunSVG} alt="Light mode" /> */}
            {theme}
        </button>
    )
}