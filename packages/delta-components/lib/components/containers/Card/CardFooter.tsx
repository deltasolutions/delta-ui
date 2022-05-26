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
          gap: 2,
          paddingX: 5,
          paddingBottom: 5,
        }}
        {...props}
      />
    );
  }
);
