import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useThemed, BoxProps, Anchor } from 'restyler';
import { LayoutContext } from './LayoutContext';
import { LayoutMenu } from './LayoutMenu';

export interface LayoutSidebarProps extends BoxProps {}

export const LayoutSidebar = ({ children, ...rest }: LayoutSidebarProps) => {
  const ThemedLayoutSidebar = useThemed('div', 'layout.sidebar');
  const ThemedLayoutSidebarAccount = useThemed('div', 'layout.sidebar.account');
  const { sidebar } = useContext(LayoutContext);
  if (!sidebar) {
    return null;
  }
  const { account, onAccountClick } = sidebar;
  return (
    <ThemedLayoutSidebar {...rest}>
      {account && (
        <ThemedLayoutSidebarAccount>
          <MdAccountCircle />
          <Anchor onClick={onAccountClick}>@{account}</Anchor>
        </ThemedLayoutSidebarAccount>
      )}
      <LayoutMenu />
    </ThemedLayoutSidebar>
  );
};

LayoutSidebar.displayName = 'LayoutSidebar';
