import { jsx } from '@theme-ui/core';
import { useCallback, useContext, useMemo } from 'react';
import { Menu, MenuGroup, MenuItem } from 'restyler';
import { PageDef } from '../../models';
import { LayoutContext } from './LayoutContext';

export const LayoutMenu = () => {
  const {
    pages = [],
    sidebar: { menu: { getActiveIds = () => [], ...rest } = {} } = {}
  } = useContext(LayoutContext);
  const activeIds = useMemo(() => getActiveIds(), [getActiveIds]);
  const renderPage = useCallback(({ id, title, subs }: PageDef) => {
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
  return (
    <Menu activeIds={activeIds} {...rest}>
      {pages.map(v => renderPage(v))}
    </Menu>
  );
};
