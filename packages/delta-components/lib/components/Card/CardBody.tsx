import { jsx } from '@theme-ui/core';
import { HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const CardBody = ({ children, ...rest }: CardBodyProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        padding: 6,
        flexDirection: 'column',
        gap: 2
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
