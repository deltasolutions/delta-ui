import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface ModalHeadingProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalHeading = forwardRef<HTMLDivElement, ModalHeadingProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 8,
          paddingBottom: 5
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
