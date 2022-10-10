import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';
import { QueryableOptions } from './TableSearch';

export const TableSearchContext = createContext<TableSearchContextOptions>(
  {} as TableSearchContextOptions
);

export interface TableSearchContextOptions {
  options: string[];
  selections: unknown[];
  setItems: Dispatch<SetStateAction<{ [key: string]: unknown[] }>>;
  renderOptionOperator?: (operator: string) => ReactNode;
  renderSelectialOperator?: (operator: string) => ReactNode;
  queryables?: QueryableOptions[];
  loading: boolean;
  handleRemoval: (v: unknown) => void;
  handleAddition: (v: unknown) => void;
  items: { [key: string]: unknown[] };
}
