import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export interface AlertHolderProps extends Omit<BoxProps, 'children'> {
  children?: any;
}

export const AlertHolder = forwardRef<HTMLDivElement, AlertHolderProps>(
  ({ children, ...rest }, ref) => {
    if (!children || children?.length === 0) {
      return null;
    }

    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
