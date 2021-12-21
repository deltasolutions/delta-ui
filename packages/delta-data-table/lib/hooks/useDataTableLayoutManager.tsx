import { useMemo, useState } from 'react';
import {
  DataTableLayoutDef,
  DataTableLayoutManager,
  DataTableLayoutManagerOptions
} from '../models';

export const useDataTableLayoutManager = ({
  initialLayout,
  initialTab = { name: '?' }
}: DataTableLayoutManagerOptions): DataTableLayoutManager => {
  const [layout, setLayout] = useState<DataTableLayoutDef>(() => ({
    ...initialLayout,
    tabs:
      initialLayout && initialLayout.tabs.length > 0
        ? initialLayout.tabs
        : [initialTab]
  }));
  const [isConfiguringLayout, setIsConfiguringLayout] = useState(false);
  const manager = {
    initialLayout,
    initialTab,
    isConfiguringLayout,
    layout,
    setIsConfiguringLayout,
    setLayout
  };
  return useMemo(() => manager, Object.values(manager));
};
