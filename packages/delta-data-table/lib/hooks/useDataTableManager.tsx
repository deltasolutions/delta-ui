import { useMemo } from 'react';
import { DataTableManager, DataTableManagerOptions } from '../models';
import { useDataTableContentManager } from './useDataTableContentManager';
import { useDataTableLayoutManager } from './useDataTableLayoutManager';
import { useDataTableTabManager } from './useDataTableTabManager';

export const useDataTableManager = <T extends object>(
  options: DataTableManagerOptions<T>
): DataTableManager<T> => {
  const layoutManager = useDataTableLayoutManager();
  const tabManager = useDataTableTabManager({ layoutManager });
  const contentManager = useDataTableContentManager({ tabManager, ...options });
  return useMemo(
    () => ({
      ...layoutManager,
      ...tabManager,
      ...contentManager
    }),
    [layoutManager, tabManager, contentManager]
  );
};
