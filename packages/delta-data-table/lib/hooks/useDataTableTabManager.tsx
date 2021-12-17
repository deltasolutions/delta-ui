import { SetStateAction, useCallback, useMemo, useState } from 'react';
import {
  DataTableTabDef,
  DataTableTabManagerOptions,
  DataTableTabManager
} from '../models';

export const useDataTableTabManager = ({
  layoutManager
}: DataTableTabManagerOptions): DataTableTabManager => {
  const { layout, setLayout } = layoutManager;
  const [activeTabName, setActiveTabName] = useState(layout.tabs[0].name);
  console.log('activeTabName', activeTabName, layout);
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
    const repeatingRegExp = / \((\d+)\)$/;
    const lastTab = layout.tabs[layout.tabs.length - 1];
    const nextTab = {
      ...lastTab,
      name: repeatingRegExp.test(lastTab.name)
        ? lastTab.name.replace(
            repeatingRegExp,
            (_, v) => ` (${parseInt(v) + 1})`
          )
        : lastTab.name + ' (1)'
    };
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
