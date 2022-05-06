import { createContext } from 'react';
export interface TabGroupContextProps {
  activeId: string | number;
}

export const TabContext = createContext({} as TabGroupContextProps);
