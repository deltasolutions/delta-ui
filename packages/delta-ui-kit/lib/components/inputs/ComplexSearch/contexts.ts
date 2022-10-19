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
  segments: ComplexSearchSegment[];
  removeSegment: (index: number) => void;
  updateSegment: (index: number, key: string, value?: string) => void;
  addSegment: (id: any) => void;
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
