import { SetStateAction, useCallback, useMemo, useState } from 'react';
import {
  DataTableTabDef,
  DataTableTabManagerOptions,
  DataTableTabManager
} from '../models';

export const useDataTableTabManager = ({
  layoutManager,
  defaultTab = { columnOrder: [], columnSizes: {}, columnExclusions: [] }
}: DataTableTabManagerOptions): DataTableTabManager => {
  const { layout, setLayout } = layoutManager;
  const [activeTabName, setActiveTabName] = useState('main');
  const activeTab = useMemo(
    () => layout.tabs.find(v => v.name === activeTabName) ?? layout.tabs[0]!,
    [activeTabName, layout]
  );
  const updateActiveTab = useCallback(
    (dispatcher: SetStateAction<Partial<DataTableTabDef>>) => {
      const tab =
        typeof dispatcher === 'function' ? dispatcher(activeTab) : dispatcher;
      setLayout({
        ...layout,
        tabs: layout.tabs.map(v =>
          v.name === activeTabName ? { ...v, ...tab } : v
        )
      });
    },
    [layout, activeTab, activeTabName]
  );
  const addTab = useCallback(
    (name: string) => {
      setLayout({
        ...layout,
        tabs: layout.tabs.concat({ ...defaultTab, name })
      });
      setActiveTabName(name);
    },
    [layout, defaultTab]
  );
  const removeTab = useCallback(
    (name: string) => {
      setLayout({
        ...layout,
        tabs: layout.tabs.filter(v => v.name !== name)
      });
      if (name === activeTabName) {
        const index = layout.tabs.findIndex(v => v.name === name);
        const fallback =
          layout.tabs[index + 1]?.name ??
          layout.tabs[index - 1]?.name ??
          'default';
        setActiveTabName(fallback);
      }
    },
    [activeTabName, layout]
  );
  const manager = {
    defaultTab,
    activeTab,
    activeTabName,
    setActiveTabName,
    updateActiveTab,
    addTab,
    removeTab
  };
  return useMemo(() => manager, Object.values(manager));
};
