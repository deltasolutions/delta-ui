import { useMemo, useState } from 'react';
import { clone } from 'restyler';
import {
  DataTableLayoutDef,
  DataTableLayoutManager,
  DataTableLayoutManagerOptions
} from '../models';

export const useDataTableLayoutManager = ({
  initialLayout
}: DataTableLayoutManagerOptions): DataTableLayoutManager => {
  const [layout, setLayout] = useState<DataTableLayoutDef>(() => ({
    ...initialLayout,
    tabs:
      initialLayout && initialLayout.tabs.length > 0
        ? initialLayout.tabs
        : [{ name: '@' }]
  }));
  const [isConfiguringLayout, setIsConfiguringLayout] = useState(false);
  const manager = {
    initialLayout,
    isConfiguringLayout,
    layout,
    setIsConfiguringLayout,
    setLayout
  };
  return useMemo(() => manager, Object.values(manager));
};
