import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`
          ${
            theme === 'light'
              ? 'bg-slate-100 text-slate-600'
              : 'bg-slate-900 text-slate-300'
          }
         min-w-full min-h-screen flex flex-col text-[1rem]`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
