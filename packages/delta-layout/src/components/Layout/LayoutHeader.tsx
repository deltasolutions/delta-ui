import { jsx } from '@theme-ui/core';
import { ReactNode, useContext } from 'react';
import { useThemed, Heading } from 'restyler';
import { LayoutActions } from './LayoutActions';
import { LayoutContainer } from './LayoutContainer';
import { LayoutContext } from './LayoutContext';

export interface HeaderProps {
  children?: ReactNode;
}

export const LayoutHeader = ({ children }: HeaderProps) => {
  const ThemedLayoutHeader = useThemed('div', 'layout.header');
  const ThemedLayoutHeaderContent = useThemed('div', 'layout.header.content');
  const heading =
    typeof children === 'string' ? (
      <Heading kind="layout">{children}</Heading>
    ) : (
      children
    );
  return (
    <ThemedLayoutHeader>
      <LayoutContainer>
        <ThemedLayoutHeaderContent>
          {heading}
          <LayoutActions />
        </ThemedLayoutHeaderContent>
      </LayoutContainer>
    </ThemedLayoutHeader>
  );
};

LayoutHeader.displayName = 'LayoutHeader';
