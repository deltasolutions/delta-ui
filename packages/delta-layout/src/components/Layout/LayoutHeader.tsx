import { jsx } from '@theme-ui/core';
import { ReactNode } from 'react';
import { useThemed, Heading } from 'restyler';
import { LayoutContainer } from './LayoutContainer';

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
        <ThemedLayoutHeaderContent>{heading}</ThemedLayoutHeaderContent>
      </LayoutContainer>
    </ThemedLayoutHeader>
  );
};

LayoutHeader.displayName = 'LayoutHeader';
