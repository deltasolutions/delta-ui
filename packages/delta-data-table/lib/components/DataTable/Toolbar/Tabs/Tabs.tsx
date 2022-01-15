import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IoAdd } from 'react-icons/io5';
import { Box, Button, useThemed } from 'restyler';
import { DataTableContext } from '../../DataTableContext';
import { Item } from './Item';

export const Tabs = () => {
  const [t] = useTranslation();
  const ThemedTabs = useThemed('div', 'dataTable.tabs');
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
        {tabNames.map((name, index) => {
          const isActive = name === activeTabName;
          return (
            <Item
              key={name}
              index={index}
              isActive={isActive}
              onClick={() => !isActive && setActiveTabName(name)}
            >
              {name}
            </Item>
          );
        })}
        {canAdd && (
          <Button kind="icon" sx={{ ml: 2 }} onClick={() => addTab()}>
            <Tooltip content={t('common:actions.add')}>
              <Box>
                <IoAdd data-role="title" />
              </Box>
            </Tooltip>
          </Button>
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
