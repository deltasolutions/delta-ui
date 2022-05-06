import { jsx } from '@theme-ui/core';
import { HTMLAttributes } from 'react';
import { Box } from '../Box';
export interface LayoutBodyProps extends HTMLAttributes<HTMLDivElement> {}
export const LayoutBody = ({ children, ...rest }: LayoutBodyProps) => {
  return (
    <Box
      role="body"
      sx={{ width: '100%', flex: '1 1 10%', minWidth: 0 }}
      {...rest}
    >
      {children}
    </Box>
  );
};
