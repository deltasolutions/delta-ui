import { jsx } from '@theme-ui/core';
import { useContext, useMemo } from 'react';
import { IoAdd, IoCloseOutline } from 'react-icons/io5';
import { useThemed, useThemedFactory } from 'restyler';
import { DataTableContext } from '../DataTableContext';

export const Tabs = () => {
  const ThemedTabs = useThemed('div', 'dataTable.tabs');
  const useTypedThemed = useThemedFactory<{ isActive: boolean }>();
  const ThemedTabsItem = useTypedThemed('button', 'dataTable.tabs.item');
  const {
    manager: {
      layout: { tabs },
      activeTabName,
      setActiveTabName,
      addTab,
      removeTab
    }
  } = useContext(DataTableContext);
  const tabNames = tabs.map(v => v.name);
  const canAdd = tabs.length < 6;
  return useMemo(
    () => (
      <ThemedTabs>
        {tabNames.map(name => {
          const isActive = name === activeTabName;
          return (
            <ThemedTabsItem
              key={name}
              isActive={isActive}
              onClick={() => !isActive && setActiveTabName(name)}
            >
              {name}
            </ThemedTabsItem>
          );
        })}
        {canAdd && (
          <ThemedTabsItem isActive={false} onClick={() => addTab()}>
            <IoAdd data-role="title" />
          </ThemedTabsItem>
        )}
      </ThemedTabs>
    ),
    [
      tabNames.join(),
      activeTabName,
      setActiveTabName,
      addTab,
      removeTab,
      canAdd
    ]
  );
};
