import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextProps {
    isCelsius: boolean;
    toggleUnit: () => void;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps>({
    isCelsius: true,
    toggleUnit: () => {},
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isCelsius, setIsCelsius] = useState(true);

    useEffect(() => {
        const loadUnit = async () => {
            const unit = await AsyncStorage.getItem('unit');
            if (unit !== null) {
                setIsCelsius(unit === 'celsius');
            }
        };
        loadUnit();
    }, []);

    const toggleUnit = async () => {
        const newUnit = !isCelsius;
        setIsCelsius(newUnit);
        await AsyncStorage.setItem('unit', newUnit ? 'celsius' : 'fahrenheit');
    };

    return (
        <ThemeContext.Provider value={{ isCelsius, toggleUnit }}>
            {children}
        </ThemeContext.Provider>
    );
};
