import { useMemo, useState } from 'react';
import { useUpdateEffect } from 'restyler';
import {
  DataTableLayoutDef,
  DataTableLayoutManager,
  DataTableLayoutStatus
} from '../models';

export const useDataTableLayoutManager = (): DataTableLayoutManager => {
  const [layout, setLayout] = useState<DataTableLayoutDef>({
    tabs: [
      {
        name: 'main',
        columnOrder: [],
        columnSizes: {},
        columnExclusions: []
      }
    ]
  });
  const [isConfiguringLayout, setIsConfiguringLayout] = useState(false);
  const [layoutStatus, setLayoutStatus] = useState(
    DataTableLayoutStatus.Synced
  );
  useUpdateEffect(() => {
    // TODO: server integration
    if (layoutStatus === DataTableLayoutStatus.Synced) {
      setLayoutStatus(DataTableLayoutStatus.Syncing);
      const id = setTimeout(
        () => setLayoutStatus(DataTableLayoutStatus.Synced),
        2000
      );
      return () => {
        clearTimeout(id);
      };
    }
    return undefined;
  }, [layout]);
  const manager = {
    layout,
    setLayout,
    isConfiguringLayout,
    setIsConfiguringLayout,
    layoutStatus,
    setLayoutStatus
  };
  return useMemo(() => manager, Object.values(manager));
};
