import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';
import { ComplexSearchProps } from '../..';
import { ComplexSearchSegment } from './types';

export const ComplexSearchContext = createContext(
  {} as ComplexSearchContextOptions
);

export interface ComplexSearchContextOptions {
  proposals: ComplexSearchProps['proposals'];
  editingIndex?: number;
  setEditingIndex: Dispatch<SetStateAction<number | undefined>>;
  fetchItemValueOptions: (key: string, query: string) => void;
  itemsValueOptions: { [key: string]: unknown[] | 'loading' };
  items: ComplexSearchSegment[];
  removeItem: (index: number) => void;
  updateItem: (index: number, key: string, value?: string) => void;
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
