import { useState, createContext } from 'react';

export const Context = createContext();

const ContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const contextValue = {
    isLoading,
    setIsLoading,
    theme,
    toggleTheme,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
