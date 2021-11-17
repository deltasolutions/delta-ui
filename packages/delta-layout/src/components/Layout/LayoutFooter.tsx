import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { useThemedFactory } from 'restyler';
import { LayoutContextValue } from '../../models';
import { LayoutContainer } from './LayoutContainer';
import { LayoutContext } from './LayoutContext';

export const LayoutFooter = () => {
  const useThemed = useThemedFactory<LayoutContextValue>();
  const ThemedLayoutFooter = useThemed('div', 'layout.footer');
  const ThemedLayoutFooterContent = useThemed('div', 'layout.footer.content');
  const context = useContext(LayoutContext);
  if (!context.footer) {
    return null;
  }
  const {
    footer: { content }
  } = context;
  return (
    <ThemedLayoutFooter {...context}>
      <LayoutContainer>
        <ThemedLayoutFooterContent {...context}>
          {content}
        </ThemedLayoutFooterContent>
      </LayoutContainer>
    </ThemedLayoutFooter>
  );
};

LayoutFooter.displayName = 'LayoutFooter';
