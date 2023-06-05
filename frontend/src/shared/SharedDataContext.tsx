import { SetStateAction, createContext } from 'react';

// Create a new context
const SharedDataContext = createContext({
  sharedData: '',
  updateSharedData: (_data: SetStateAction<string>) => { },
});
  
export default SharedDataContext;