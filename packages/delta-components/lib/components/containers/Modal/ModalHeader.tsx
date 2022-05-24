import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          paddingX: 6,
          paddingTop: 5,
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
