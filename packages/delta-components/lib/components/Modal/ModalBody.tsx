import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface ModalBodyProps extends BoxProps {}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Box
        sx={{
          paddingTop: 6,
          paddingBottom: 6,
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
