import { useMemo } from 'react';
import { DataTableManager, DataTableManagerOptions } from '../models';
import { useDataTableContentManager } from './useDataTableContentManager';
import { useDataTableLayoutManager } from './useDataTableLayoutManager';
import { useDataTableQueryManager } from './useDataTableQueryManager';
import { useDataTableTabManager } from './useDataTableTabManager';

export const useDataTableManager = <T extends object>({
  initialLayout,
  ...rest
}: DataTableManagerOptions<T>): DataTableManager<T> => {
  const layoutManager = useDataTableLayoutManager({ initialLayout });
  const tabManager = useDataTableTabManager({ layoutManager });
  const queryManager = useDataTableQueryManager();
  const contentManager = useDataTableContentManager({
    tabManager,
    queryManager,
    ...rest
  });
  return useMemo(
    () => ({
      ...layoutManager,
      ...tabManager,
      ...contentManager,
      ...queryManager
    }),
    [layoutManager, tabManager, contentManager, queryManager]
  );
};
