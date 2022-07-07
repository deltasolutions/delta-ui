import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: 2,
          py: 3,
          paddingX: 4,
        }}
        {...props}
      />
    );
  }
);
