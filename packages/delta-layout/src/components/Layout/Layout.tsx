import { jsx } from '@theme-ui/core';
import { useMemo } from 'react';
import { BoxProps, hash, useThemedFactory } from 'restyler';
import {
  LayoutUpdateManagerOptions,
  useLayoutUpdateManager
} from '../../hooks';
import { LayoutContextValue, LayoutOptions } from '../../models';
import { LayoutBody } from './LayoutBody';
import { LayoutContext } from './LayoutContext';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';
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
  children,
  ...rest
}: LayoutProps) => {
  const useThemed = useThemedFactory<LayoutContextValue>();
  const ThemedLayout = useThemed('div', 'layout');
  const contextValue = {
    header,
    footer,
    sidebar
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
          <ThemedLayout {...memoizedContextValue} {...rest}>
            <LayoutHeader />
            <LayoutBody>{children}</LayoutBody>
            <LayoutFooter />
          </ThemedLayout>
        </LayoutContext.Provider>
      </LayoutUpdateContext.Provider>
    ),
    [children, memoizedContextValue, hash(rest)]
  );
};

Layout.displayName = 'Layout';
