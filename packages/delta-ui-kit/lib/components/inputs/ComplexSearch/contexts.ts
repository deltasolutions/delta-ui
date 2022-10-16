import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';
import { ComplexSearchItemType, ComplexSearchPropose } from './types';

export const ComplexSearchContext = createContext(
  {} as ComplexSearchContextOptions
);

export interface ComplexSearchContextOptions {
  proposes: ComplexSearchPropose[];
  editingIndex?: number;
  setEditingIndex: Dispatch<SetStateAction<number | undefined>>;
  fetchItemValueOptions: (key: string, query: string) => void;
  itemsValueOptions: { [key: string]: unknown[] | 'loading' };
  items: ComplexSearchItemType[];
  removeItem: (index: number) => void;
  updateItem: (index: number, key: string, value?: string) => void;
  renderOperator?: (operator: string) => ReactNode;
  addItem: (id: any) => void;
}

export const DropContext = createContext({} as DropContextOptions);

export interface DropContextOptions {
  query?: string;
}
export const DropContentContext = createContext(
  {} as DropContentContextOptions
);

export interface DropContentContextOptions {
  handleClose: () => void;
  onItemClick: (value: string) => void;
}
