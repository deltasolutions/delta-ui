import { jsx } from '@theme-ui/core';
import { HTMLAttributes, ReactNode, useContext } from 'react';
import { useThemed, ThemeProps } from 'restyler';
import { LayoutContext } from './LayoutContext';

export interface LayoutActionsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    ThemeProps {}

export const LayoutActions = (props: LayoutActionsProps) => {
  const ThemedLayoutActions = useThemed('div', 'layout.actions');
  const { actions } = useContext(LayoutContext);
  if (!actions) {
    return null;
  }
  return <ThemedLayoutActions {...props}>{actions}</ThemedLayoutActions>;
};

LayoutActions.displayName = 'LayoutActions';
