import { jsx } from '@theme-ui/core';
import { useCallback, useContext, useMemo } from 'react';
import { Menu, MenuGroup, MenuItem } from 'restyler';
import { LayoutMenuEntryDef } from '../../models';
import { LayoutContext } from './LayoutContext';

export const LayoutMenu = () => {
  const {
    sidebar: {
      menu: {
        entries = [],
        activeIds = [],
        onGroupClick = undefined,
        onItemClick = undefined
      } = {}
    } = {}
  } = useContext(LayoutContext);
  const renderPage = useCallback(({ id, title, subs }: LayoutMenuEntryDef) => {
    if (subs) {
      return (
        <MenuGroup key={id} id={id} title={title}>
          {subs.map(v => renderPage(v))}
        </MenuGroup>
      );
    }
    return (
      <MenuItem key={id} id={id}>
        {title}
      </MenuItem>
    );
  }, []);
  return useMemo(
    () => (
      <Menu
        activeIds={activeIds}
        onGroupClick={onGroupClick}
        onItemClick={onItemClick}
      >
        {entries.map(v => renderPage(v))}
      </Menu>
    ),
    [entries, activeIds, onGroupClick, onItemClick]
  );
};
