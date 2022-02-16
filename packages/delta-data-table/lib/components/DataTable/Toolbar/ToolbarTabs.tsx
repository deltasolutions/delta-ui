import { jsx } from '@theme-ui/core';
import { useContext, useMemo } from 'react';
import { useThemed, useThemedFactory } from 'restyler';
import { DataTableContext } from '../DataTableContext';

export const ToolbarTabs = () => {
  const ThemedToolbarTabs = useThemed('div', 'dataTable.tabs');
  const useTypedThemed = useThemedFactory<{ isActive?: boolean }>();
  const ThemedItem = useTypedThemed('button', 'dataTable.tabs.item');
  const {
    manager: {
      layout: { tabs },
      activeTabName,
      setActiveTabName
    }
  } = useContext(DataTableContext);
  const tabNames = tabs.map(v => v.name);
  return useMemo(
    () => (
      <ThemedToolbarTabs>
        {tabNames.map(name => (
          <ThemedItem
            key={name}
            isActive={name === activeTabName}
            onClick={() => setActiveTabName(name)}
          >
            {name}
          </ThemedItem>
        ))}
      </ThemedToolbarTabs>
    ),
    [tabNames.join(), activeTabName, setActiveTabName]
  );
};
