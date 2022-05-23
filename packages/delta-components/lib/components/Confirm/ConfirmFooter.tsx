import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface ConfirmFooterProps extends BoxProps {}

export const ConfirmFooter = forwardRef<HTMLDivElement, ConfirmFooterProps>(
  ({ children, ...rest }: ConfirmFooterProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: 4,
          paddingX: 5,
          paddingBottom: 4,
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
