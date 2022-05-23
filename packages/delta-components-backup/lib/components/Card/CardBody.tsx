import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, ...rest }: CardBodyProps, ref) => {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          padding: 6,
          flexDirection: 'column',
          gap: 2
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
