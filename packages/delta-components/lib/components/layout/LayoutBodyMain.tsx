import { jsx } from '@theme-ui/core';
import { HTMLAttributes } from 'react';
import { LAYOUT_BODY_PADDING } from '../../variables';
import { Box } from '../Box';

export interface LayoutBodyMainProps extends HTMLAttributes<HTMLDivElement> {}
export const LayoutBodyMain = ({ children, ...rest }: LayoutBodyMainProps) => {
  return (
    <Box sx={{ width: '100%', paddingX: `${LAYOUT_BODY_PADDING}px` }} {...rest}>
      {children}
    </Box>
  );
};
