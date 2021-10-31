import { createContext } from 'react';
import { DataTableColumn } from './types';
import { LayoutManager } from './useLayoutManager';
import { TabManager } from './useTabManager';

const noop = new Proxy(
  {},
  {
    get() {
      throw new Error('Context must be created');
    }
  }
);

export interface DataTableContextValue extends LayoutManager, TabManager {
  originalColumns: DataTableColumn[];
  columns: DataTableColumn[];
}

export const DataTableContext = createContext(noop as DataTableContextValue);
