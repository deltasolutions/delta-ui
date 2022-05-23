import { createContext } from 'react';

export const LayoutContext = createContext({} as LayoutContextProps);

export interface LayoutContextProps {
  isScrolling: boolean;
  height: number;
  scrollTop: number;
}
