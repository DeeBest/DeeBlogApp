import { createContext, useContext } from 'react';
import { Context } from './context';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const { theme } = useContext(Context);

  return (
    <div
      className={
        theme === 'light'
          ? 'bg-slate-100 text-slate-600'
          : 'bg-slate-900 text-slate-300'
      }
    >
      {children}
    </div>
  );
};

export default ThemeContext;
