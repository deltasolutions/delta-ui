import { jsx } from '@theme-ui/core';
import { Fragment, useCallback, useContext, useMemo } from 'react';
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
        onItemClick = undefined,
        icons = {}
      } = {}
    } = {}
  } = useContext(LayoutContext);
  const renderPage = useCallback(
    ({ id, title, icon, subs }: LayoutMenuEntryDef) => {
      const Icon = icon && icons[icon];
      const titleElement = (
        <Fragment>
          {Icon && <Icon />}
          {title}
        </Fragment>
      );
      if (subs) {
        return (
          <MenuGroup key={id} id={id} title={titleElement}>
            {subs.map(v => renderPage(v))}
          </MenuGroup>
        );
      }
      return (
        <MenuItem key={id} id={id}>
          {titleElement}
        </MenuItem>
      );
    },
    []
  );
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
