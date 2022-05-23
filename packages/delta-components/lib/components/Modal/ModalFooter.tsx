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
          paddingTop: 5,
          paddingBottom: 8,
          paddingLeft: 8,
          paddingRight: 8,
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
