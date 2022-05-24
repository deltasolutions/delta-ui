import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface ModalBodyProps extends BoxProps {}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Box
        sx={{
          paddingX: 6,
          paddingY: 5,
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
