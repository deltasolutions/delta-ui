import { Dispatch, SetStateAction } from 'react';

export interface DataTableQueryManager {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}
