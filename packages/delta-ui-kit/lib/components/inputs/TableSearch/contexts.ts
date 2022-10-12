import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';
import { BunchData, Propose } from './types';

export const DropContext = createContext<DropContextOptions>(
  {} as DropContextOptions
);

export interface DropContextOptions {
  renderDrop: (handleClose: any) => ReactNode;
}

export const TableSearchContext = createContext<TableSearchContextOptions>(
  {} as TableSearchContextOptions
);

export interface TableSearchContextOptions {
  proposes: Propose[];
  value: BunchData[];
  disabled?: boolean;
  setValue: Dispatch<SetStateAction<BunchData[] | []>>;
  currentEditingIndex?: number | null;
  setCurrentEditingIndex: Dispatch<SetStateAction<number | undefined | null>>;
  onBunchRemove: (index: number, byMouse?: boolean) => void;
}
