import { jsx } from '@theme-ui/core';
import { HTMLAttributes } from 'react';
import { Box } from '../Box';
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}
export const CardFooter = ({ children, ...rest }: CardFooterProps) => {
  return (
    <Box sx={{ padding: '0 24px 24px 24px', display: 'flex' }} {...rest}>
      {children}
    </Box>
  );
};
