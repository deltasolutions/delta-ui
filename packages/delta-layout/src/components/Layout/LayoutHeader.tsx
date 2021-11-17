import { jsx } from '@theme-ui/core';
import { useContext, useMemo } from 'react';
import { Heading, useThemedFactory } from 'restyler';
import { LayoutContextValue } from '../../models';
import { LayoutContainer } from './LayoutContainer';
import { LayoutContext } from './LayoutContext';

export const LayoutHeader = () => {
  const useThemed = useThemedFactory<LayoutContextValue>();
  const ThemedLayoutHeader = useThemed('div', 'layout.header');
  const ThemedLayoutHeaderContent = useThemed('div', 'layout.header.content');
  const ThemedLayoutHeaderExtras = useThemed('div', 'layout.header.extras');
  const context = useContext(LayoutContext);
  if (!context.header) {
    return null;
  }
  const {
    header: { title, extras }
  } = context;
  return useMemo(
    () => (
      <ThemedLayoutHeader {...context}>
        <LayoutContainer>
          <ThemedLayoutHeaderContent {...context}>
            <Heading level={1} kind="layout">
              {title}
            </Heading>
            {extras && (
              <ThemedLayoutHeaderExtras {...context}>
                {extras}
              </ThemedLayoutHeaderExtras>
            )}
          </ThemedLayoutHeaderContent>
        </LayoutContainer>
      </ThemedLayoutHeader>
    ),
    [title, extras]
  );
};

LayoutHeader.displayName = 'LayoutHeader';
