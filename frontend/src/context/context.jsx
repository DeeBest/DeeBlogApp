import { useState, createContext } from 'react';

export const Context = createContext();

const ContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const contextValue = {
    isLoading,
    setIsLoading,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
