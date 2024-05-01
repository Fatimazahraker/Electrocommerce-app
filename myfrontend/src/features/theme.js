import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  dark: false, // Default value
  setDark: () => {},
  saveThemeToLocalStorage: () => {}
});

export const ThemeProvider = ({ children }) => {
  const themeKey = 'theme';
  const [dark, setDark] = useState(true);

  const saveThemeToLocalStorage = (dark) => {
    localStorage.setItem(themeKey, dark ? 'dark' : 'light');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(themeKey) || '';

    if (savedTheme) {
      setDark(savedTheme === 'dark');
    } else {
      const isSystemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDark(isSystemThemeDark);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ dark, setDark, saveThemeToLocalStorage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
