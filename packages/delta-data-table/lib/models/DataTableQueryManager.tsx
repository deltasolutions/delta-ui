import { Dispatch, SetStateAction } from 'react';

export interface DataTableQueryManager {
  query: string | undefined;
  setQuery: Dispatch<SetStateAction<string>>;
}
