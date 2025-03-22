import { useContext } from 'react';
import { Context } from '../context/context';

const useGlobal = () => {
  return useContext(Context);
};
export default useGlobal;
