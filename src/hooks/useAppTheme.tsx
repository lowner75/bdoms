// src/hooks/useAppTheme.tsx ...

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, ThemeType } from '../constants/theme';

// Define shape of the context ...
interface ThemeContextProps {
  theme: ThemeType;
  colors: typeof Colors.light;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

// Create the context ...
const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  colors: Colors.dark,
  toggleTheme: () => {},
  setTheme: () => {},
});

// Provider component ...
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeType>('dark'); // Default to dark

  // Load saved theme from storage on mount ...
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
          setThemeState(storedTheme);
        }
      } catch (e) {
        console.error('Failed to load theme from storage', e);
      }
    };
    loadTheme();
  }, []);

  // Save theme and update state ...
  const setTheme = async (newTheme: ThemeType) => {
    try {
      setThemeState(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (e) {
      console.error('Failed to save theme to storage', e);
    }
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const colors = theme === 'light' ? Colors.light : Colors.dark;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to access theme context ...
export const useAppTheme = () => useContext(ThemeContext);
