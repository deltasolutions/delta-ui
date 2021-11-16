import { jsx } from '@theme-ui/core';
import { useContext, useMemo } from 'react';
import { IoAdd, IoCloseOutline } from 'react-icons/io5';
import { RiHome6Line } from 'react-icons/ri';
import { useThemed, useThemedFactory } from 'restyler';
import { DataTableContext } from '../DataTableContext';

export const Tabs = () => {
  const ThemedTabs = useThemed('div', 'dataTable.tabs');
  const useTypedThemed =
    useThemedFactory<{ isMain: boolean; isActive: boolean }>();
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
        {tabNames.map((name, index) => {
          const isMain = name === mainTabName;
          const isActive = name === activeTabName;
          return (
            <ThemedTabsItem
              key={name}
              isMain={isMain}
              isActive={isActive}
              onClick={() => {
                isMain || !isActive
                  ? setActiveTabName(name ?? mainTabName)
                  : removeTab(name);
              }}
            >
              {isMain ? (
                <RiHome6Line data-role="title" />
              ) : (
                <span data-role="title">{letters[index - 1]}</span>
              )}
              <IoCloseOutline data-role="close" />
            </ThemedTabsItem>
          );
        })}
        {canAdd && (
          <ThemedTabsItem
            isMain={false}
            isActive={false}
            onClick={() => addTab(getNewTabName())}
          >
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

const mainTabName = 'main';
const letters = new Array(26)
  .fill('')
  .map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
const getNewTabName = () => Math.random().toString().slice(-4);
