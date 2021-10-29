import { jsx } from '@theme-ui/core';
import { BoxProps, useThemed } from 'restyler';
import { LayoutOptions } from '../../models';
import { LayoutContainer } from './LayoutContainer';
import { LayoutContext } from './LayoutContext';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';
import { LayoutSidebar } from './LayoutSidebar';

export interface LayoutProps extends BoxProps, LayoutOptions {}

export const Layout = ({
  account,
  heading,
  headerExtras,
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
    headerExtras,
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
