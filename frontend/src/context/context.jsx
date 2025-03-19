import { useState, createContext, useContext } from 'react';
import ThemeContext from './ThemeContext';

export const Context = createContext();

const ContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const linkClass = ({ isActive }) =>
    isActive && theme === 'light'
      ? 'bg-slate-700 text-slate-300 px-1 py-[1px] rounded hover:opacity-80 duration-300'
      : isActive &&
        'bg-slate-300 text-slate-700 px-1 py-[1px] rounded hover:opacity-80 duration-300';

  const contextValue = {
    isLoading,
    setIsLoading,
    linkClass,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
