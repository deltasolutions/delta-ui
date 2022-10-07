import { createContext, ReactNode } from 'react';
import { QueryableOptions } from './TableSearch';

export const TableSearchContext = createContext<TableSearchContextOptions>(
  {} as TableSearchContextOptions
);

export interface TableSearchContextOptions {
  options: string[];
  selections: unknown[];
  renderOptionOperator?: (operator: string) => ReactNode
  queryables?: QueryableOptions[];
  loading: boolean;
  handleRemoval: (v: unknown) => void;
  handleAddition: (v: unknown) => void;
  items: { [key: string]: unknown[] };
}
