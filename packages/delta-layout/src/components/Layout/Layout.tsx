import { jsx } from '@theme-ui/core';
import { useMemo } from 'react';
import { BoxProps, useThemed, hash } from 'restyler';
import {
  LayoutUpdateManagerOptions,
  useLayoutUpdateManager
} from '../../hooks';
import { LayoutOptions } from '../../models';
import { LayoutContainer } from './LayoutContainer';
import { LayoutContext } from './LayoutContext';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';
import { LayoutSidebar } from './LayoutSidebar';
import { LayoutUpdateContext } from './LayoutUpdateContext';

export interface LayoutProps
  extends BoxProps,
    LayoutOptions,
    LayoutUpdateManagerOptions {}

export const Layout = ({
  onSave,
  header,
  footer,
  sidebar,
  logoSrc,
  children,
  ...rest
}: LayoutProps) => {
  const ThemedLayout = useThemed('div', 'layout');
  const ThemedLayoutContent = useThemed('div', 'layout.content');
  const ThemedLayoutMain = useThemed('div', 'layout.main');
  const contextValue = {
    header,
    footer,
    sidebar,
    logoSrc
  };
  const memoizedContextValue = useMemo(
    () => contextValue,
    Object.values(contextValue)
  );
  const updateManager = useLayoutUpdateManager({ onSave });
  return useMemo(
    () => (
      <LayoutUpdateContext.Provider value={updateManager}>
        <LayoutContext.Provider value={contextValue}>
          <ThemedLayout {...rest}>
            <LayoutHeader />
            <LayoutContainer>
              <ThemedLayoutContent>
                <LayoutSidebar />
                <ThemedLayoutMain>{children}</ThemedLayoutMain>
              </ThemedLayoutContent>
            </LayoutContainer>
            <LayoutFooter />
          </ThemedLayout>
        </LayoutContext.Provider>
      </LayoutUpdateContext.Provider>
    ),
    [children, memoizedContextValue, hash(rest)]
  );
};

Layout.displayName = 'Layout';
