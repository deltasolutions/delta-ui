import { useMemo, useState } from 'react';
import { DataTableQueryManager } from '../models';

export const useDataTableQueryManager = (): DataTableQueryManager => {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const manager = { query, setQuery };
  return useMemo(() => manager, Object.values(manager));
};
