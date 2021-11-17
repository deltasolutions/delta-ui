import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { BoxProps, useThemedFactory } from 'restyler';
import { LayoutContextValue } from '../../models';
import { LayoutContainer } from './LayoutContainer';
import { LayoutContext } from './LayoutContext';
import { LayoutMain } from './LayoutMain';
import { LayoutSidebar } from './LayoutSidebar';

export interface LayoutBodyProps extends BoxProps {}

export const LayoutBody = ({ children, ...rest }: LayoutBodyProps) => {
  const useThemed = useThemedFactory<LayoutContextValue>();
  const ThemedLayoutBody = useThemed('div', 'layout.body');
  const ThemedLayoutBodyContent = useThemed('div', 'layout.body.content');
  const context = useContext(LayoutContext);
  return (
    <ThemedLayoutBody {...context} {...rest}>
      <LayoutContainer>
        <ThemedLayoutBodyContent {...context}>
          <LayoutSidebar />
          <LayoutMain>{children}</LayoutMain>
        </ThemedLayoutBodyContent>
      </LayoutContainer>
    </ThemedLayoutBody>
  );
};

LayoutBody.displayName = 'LayoutBody';
