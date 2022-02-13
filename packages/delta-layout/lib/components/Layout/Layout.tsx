import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { BoxProps, useThemed } from 'restyler';

const createLayoutComponent = (path: string, displayName: string) => {
  const Component = forwardRef<HTMLDivElement, BoxProps>(
    ({ children, ...rest }, ref) => {
      const ThemedComponent = useThemed('div', path);
      const ThemedComponentContent = useThemed('div', path + '.content');
      return (
        <ThemedComponent ref={ref} {...rest}>
          <ThemedComponentContent>{children}</ThemedComponentContent>
        </ThemedComponent>
      );
    }
  );
  Component.displayName = displayName;
  return Component;
};

export const Layout = createLayoutComponent('layout', 'Layout');
export const LayoutHeader = createLayoutComponent(
  'layout.header',
  'LayoutHeader'
);
export const LayoutBody = createLayoutComponent('layout.body', 'LayoutBody');
export const LayoutFooter = createLayoutComponent(
  'layout.footer',
  'LayoutFooter'
);
export const LayoutMain = createLayoutComponent('layout.main', 'LayoutMain');
export const LayoutNavbar = createLayoutComponent(
  'layout.navbar',
  'LayoutNavbar'
);
export const LayoutNavbarExtras = createLayoutComponent(
  'layout.navbar.extras',
  'LayoutNavbarExtras'
);
export const LayoutSidebar = createLayoutComponent(
  'layout.sidebar',
  'LayoutSidebar'
);
export const LayoutSidebarExtras = createLayoutComponent(
  'layout.sidebar.extras',
  'LayoutSidebarExtras'
);
