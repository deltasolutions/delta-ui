import { useEffect, useMemo } from 'react';
import { DataTableLayoutDef, StoredDataTableManagerOptions } from '../models';
import { useDataTableManager } from './useDataTableManager';

export const useStoredDataTableManager = <T extends object>({
  id,
  ...rest
}: StoredDataTableManagerOptions<T>) => {
  const stored = useMemo<{ layout?: DataTableLayoutDef }>(() => {
    if (typeof window === undefined) {
      return {};
    }
    let parsed = {};
    try {
      parsed = JSON.parse(localStorage.getItem(id) ?? '{}');
    } catch {}
    return parsed;
  }, [id]);
  const manager = useDataTableManager({
    initialLayout: stored.layout,
    ...rest
  });
  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }
    localStorage.setItem(id, JSON.stringify({ layout: manager.layout }));
  }, [manager.layout]);
  return manager;
};
