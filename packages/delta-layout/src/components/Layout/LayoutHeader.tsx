import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { Heading, useThemed } from 'restyler';
import { LayoutContainer } from './LayoutContainer';
import { LayoutContext } from './LayoutContext';

export const LayoutHeader = () => {
  const ThemedLayoutHeader = useThemed('div', 'layout.header');
  const ThemedLayoutHeaderContent = useThemed('div', 'layout.header.content');
  const ThemedLayoutHeaderExtras = useThemed('div', 'layout.header.extras');
  const { header } = useContext(LayoutContext);
  if (!header) {
    return null;
  }
  const { title, extras } = header;
  return (
    <ThemedLayoutHeader>
      <LayoutContainer>
        <ThemedLayoutHeaderContent>
          <Heading level={1} kind="layout">
            {title}
          </Heading>
          {extras && (
            <ThemedLayoutHeaderExtras>{extras}</ThemedLayoutHeaderExtras>
          )}
        </ThemedLayoutHeaderContent>
      </LayoutContainer>
    </ThemedLayoutHeader>
  );
};

LayoutHeader.displayName = 'LayoutHeader';
