import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { useThemed, BoxProps } from 'restyler';
import { LayoutContext } from './LayoutContext';

export interface LayoutHeaderExtrasProps extends Omit<BoxProps, 'children'> {}

export const LayoutHeaderExtras = (props: LayoutHeaderExtrasProps) => {
  const ThemedLayoutHeaderExtras = useThemed('div', 'layout.header.extras');
  const { headerExtras } = useContext(LayoutContext);
  if (!headerExtras) {
    return null;
  }
  return (
    <ThemedLayoutHeaderExtras {...props}>
      {headerExtras}
    </ThemedLayoutHeaderExtras>
  );
};

LayoutHeaderExtras.displayName = 'LayoutHeaderExtras';
