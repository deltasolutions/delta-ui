import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface ModalBodyProps extends BoxProps {
  variant?: 'wide';
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ variant, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          paddingX: variant === 'wide' ? 0 : 5,
          paddingY: 4,
        }}
        {...rest}
      />
    );
  }
);
