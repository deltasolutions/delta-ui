import { createContext } from 'react';

export const TabContext = createContext({} as TabContextProps);

export interface TabContextProps {
  activeId: string;
}
