import { createContext } from 'react';
import { DataTableContextValue } from '../../models';

const noop = new Proxy(
  {},
  {
    get() {
      throw new Error('Context must be created');
    }
  }
);

export const DataTableContext = createContext(
  noop as DataTableContextValue<any>
);
