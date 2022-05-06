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
          marginTop: '30px',
          justifyContent: 'space-between'
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
