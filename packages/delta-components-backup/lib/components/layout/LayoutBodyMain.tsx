import { jsx } from '@theme-ui/core';
import { HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface LayoutBodyMainProps extends HTMLAttributes<HTMLDivElement> {}
export const LayoutBodyMain = ({ children, ...rest }: LayoutBodyMainProps) => {
  return (
    <Box sx={{ width: '100%', paddingX: `${32}px` }} {...rest}>
      {children}
    </Box>
  );
};
