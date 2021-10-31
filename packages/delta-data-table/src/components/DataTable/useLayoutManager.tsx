import { useState } from 'react';
import { useUpdateEffect } from 'restyler';
import { DataTableLayout, DataTableLayoutStatus } from './types';

export const useLayoutManager = () => {
  const [layout, setLayout] = useState<DataTableLayout>({
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
  return {
    layout,
    setLayout,
    isConfiguringLayout,
    setIsConfiguringLayout,
    layoutStatus,
    setLayoutStatus
  };
};

export type LayoutManager = ReturnType<typeof useLayoutManager>;
