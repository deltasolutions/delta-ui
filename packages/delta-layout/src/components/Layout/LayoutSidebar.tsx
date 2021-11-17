import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { BoxProps, Anchor, useThemedFactory } from 'restyler';
import { LayoutContextValue } from '../../models';
import { LayoutContext } from './LayoutContext';
import { LayoutMenu } from './LayoutMenu';

export interface LayoutSidebarProps extends BoxProps {}

export const LayoutSidebar = ({ children, ...rest }: LayoutSidebarProps) => {
  const useThemed = useThemedFactory<LayoutContextValue>();
  const ThemedLayoutSidebar = useThemed('div', 'layout.sidebar');
  const ThemedLayoutSidebarAccount = useThemed('div', 'layout.sidebar.account');
  const context = useContext(LayoutContext);
  if (!context.sidebar) {
    return null;
  }
  const {
    sidebar: {
      account: { title, onClick }
    }
  } = context;
  return (
    <ThemedLayoutSidebar {...context} {...rest}>
      <ThemedLayoutSidebarAccount {...context}>
        <MdAccountCircle />
        <Anchor onClick={onClick}>@{title}</Anchor>
      </ThemedLayoutSidebarAccount>
      <LayoutMenu />
    </ThemedLayoutSidebar>
  );
};

LayoutSidebar.displayName = 'LayoutSidebar';
