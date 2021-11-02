import { useMemo } from 'react';
import { DataTableManager, DataTableManagerOptions } from '../models';
import { useDataTableContentManager } from './useDataTableContentManager';
import { useDataTableLayoutManager } from './useDataTableLayoutManager';
import { useDataTableTabManager } from './useDataTableTabManager';

export const useDataTableManager = <T extends object>({
  initialLayout,
  ...rest
}: DataTableManagerOptions<T>): DataTableManager<T> => {
  const layoutManager = useDataTableLayoutManager({ initialLayout });
  const tabManager = useDataTableTabManager({ layoutManager });
  const contentManager = useDataTableContentManager({ tabManager, ...rest });
  return useMemo(
    () => ({
      ...layoutManager,
      ...tabManager,
      ...contentManager
    }),
    [layoutManager, tabManager, contentManager]
  );
};
