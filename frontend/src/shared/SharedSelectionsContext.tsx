import { SetStateAction, createContext } from 'react';

// Create a new context
const SharedSelectionsContext = createContext({
  selectedIds: [] as string[],
  updateSharedSelectionsContext: (_data: SetStateAction<Array<string[]>>, _check: boolean) => { },
});
  
export default SharedSelectionsContext;