import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface ConfirmBodyProps extends BoxProps {}

export const ConfirmBody = forwardRef<HTMLDivElement, ConfirmBodyProps>(
  ({ children, ...rest }: ConfirmBodyProps, ref) => {
    return (
      <Box ref={ref} {...rest}>
        <Box sx={{ paddingX: 5, paddingY: 4 }}>{children}</Box>
      </Box>
    );
  }
);
