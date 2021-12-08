import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { BoxProps, useThemedFactory } from 'restyler';
import { LayoutContextValue } from '../../models';
import { LayoutContext } from './LayoutContext';

export interface LayoutMainProps extends BoxProps {}

export const LayoutMain = (props: LayoutMainProps) => {
  const useThemed = useThemedFactory<LayoutContextValue>();
  const ThemedLayoutMain = useThemed('div', 'layout.main');
  const context = useContext(LayoutContext);
  return <ThemedLayoutMain {...context} {...props} />;
};

LayoutMain.displayName = 'LayoutMain';
