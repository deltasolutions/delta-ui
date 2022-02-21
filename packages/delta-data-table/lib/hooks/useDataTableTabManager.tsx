import { SetStateAction, useCallback, useMemo, useState } from 'react';
import { clone } from 'restyler';
import {
  DataTableTabDef,
  DataTableTabManagerOptions,
  DataTableTabManager
} from '../models';

export const useDataTableTabManager = ({
  layoutManager: { initialTab, layout, setLayout }
}: DataTableTabManagerOptions): DataTableTabManager => {
  const [activeTabName, setActiveTabName] = useState(layout.tabs[0].name);
  const activeTab = useMemo(
    () => layout.tabs.find(v => v.name === activeTabName) ?? layout.tabs[0]!,
    [activeTabName, layout]
  );
  const updateActiveTab = useCallback(
    (dispatcher: SetStateAction<Partial<DataTableTabDef>>) => {
      const tab =
        dispatcher instanceof Function ? dispatcher(activeTab) : dispatcher;
      setLayout({
        ...layout,
        tabs: layout.tabs.map(v =>
          v.name === activeTabName ? { ...v, ...tab } : v
        )
      });
    },
    [layout, activeTab, activeTabName]
  );
  const addTab = useCallback(() => {
    const nextTab = clone(initialTab);
    let priorCount = layout.tabs.reduce(
      (p, v) => p + (v.name.startsWith(nextTab.name) ? 1 : 0),
      0
    );
    if (priorCount) {
      const getSuffix = () => ` (${priorCount})`;
      while (layout.tabs.some(v => v.name === nextTab.name + getSuffix())) {
        priorCount++;
      }
      nextTab.name += getSuffix();
    }
    setLayout({
      ...layout,
      tabs: layout.tabs.concat([nextTab])
    });
    setActiveTabName(nextTab.name);
  }, [layout]);
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
    activeTab,
    activeTabName,
    setActiveTabName,
    updateActiveTab,
    addTab,
    removeTab
  };
  return useMemo(() => manager, Object.values(manager));
};
