import { createContext, useState } from 'react';

export const DarkModeContext = createContext(null);

export const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    true //localStorage.getItem('isDark') === 'true'
  );
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    localStorage.setItem('isDark', !isDark);
  };
  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
