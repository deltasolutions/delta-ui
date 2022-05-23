import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          paddingX: 6,
          paddingBottom: 5,
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
