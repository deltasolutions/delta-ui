import { jsx } from '@theme-ui/core';
import { HTMLAttributes } from 'react';
import { ThemeProps, useThemed } from 'restyler';
import { LayoutOptions } from '../../models';
import { LayoutContainer } from './LayoutContainer';
import { LayoutContext } from './LayoutContext';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';
import { LayoutSidebar } from './LayoutSidebar';

export interface LayoutProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps,
    LayoutOptions {}

export const Layout = ({
  account,
  heading,
  logoSrc,
  onAccountClick,
  children,
  ...rest
}: LayoutProps) => {
  const ThemedLayout = useThemed('div', 'layout');
  const ThemedLayoutContent = useThemed('div', 'layout.content');
  const ThemedLayoutMain = useThemed('div', 'layout.main');
  const contextValue = {
    account,
    heading,
    logoSrc,
    onAccountClick
  };
  return (
    <LayoutContext.Provider value={contextValue}>
      <ThemedLayout {...rest}>
        <LayoutHeader>{heading}</LayoutHeader>
        <LayoutContainer>
          <ThemedLayoutContent>
            <LayoutSidebar />
            <ThemedLayoutMain>{children}</ThemedLayoutMain>
          </ThemedLayoutContent>
        </LayoutContainer>
        <LayoutFooter />
      </ThemedLayout>
    </LayoutContext.Provider>
  );
};

Layout.displayName = 'Layout';
