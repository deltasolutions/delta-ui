import { jsx } from '@theme-ui/core';
import { AllHTMLAttributes, forwardRef, HTMLAttributes } from 'react';
import { ThemeProps, useThemed } from 'restyler';

export interface LayoutContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  contentProps?: AllHTMLAttributes<HTMLDivElement> & ThemeProps;
}

export const LayoutContainer = forwardRef<HTMLDivElement, LayoutContainerProps>(
  ({ contentProps, children, ...rest }, ref) => {
    const ThemedLayoutContainer = useThemed('div', 'layout.container');
    const ThemedLayoutContainerContent = useThemed(
      'div',
      'layout.container.content'
    );
    return (
      <ThemedLayoutContainer ref={ref} {...rest}>
        <ThemedLayoutContainerContent {...contentProps}>
          {children}
        </ThemedLayoutContainerContent>
      </ThemedLayoutContainer>
    );
  }
);

LayoutContainer.displayName = 'LayoutContainer';
