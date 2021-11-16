import { useEffect } from 'react';
import { StoredDataTableManagerOptions } from '../models';
import { useDataTableManager } from './useDataTableManager';

export const useStoredDataTableManager = <T extends object>({
  id,
  ...rest
}: StoredDataTableManagerOptions<T>) => {
  const manager = useDataTableManager(rest);
  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }
    try {
      const { layout } = JSON.parse(localStorage.getItem(id) ?? '');
      manager.setLayout(layout);
    } catch {}
  }, [id]);
  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }
    localStorage.setItem(id, JSON.stringify({ layout: manager.layout }));
  }, [manager.layout]);
  return manager;
};
