import { jsx } from '@theme-ui/core';
import { HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = ({ children, ...rest }: CardFooterProps) => {
  return (
    <Box
      sx={{
        paddingTop: 0,
        paddingLeft: 6,
        paddingRight: 6,
        paddingBottom: 6,
        display: 'flex'
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
