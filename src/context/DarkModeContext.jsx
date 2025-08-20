import { useState, useEffect } from 'react';
import { DarkModeContext } from './DarkModeContext';

export function DarkModeProvider({ children }) {
    const [isDark, setIsDark] = useState(() =>
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    return (
        <DarkModeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </DarkModeContext.Provider>
    );
}