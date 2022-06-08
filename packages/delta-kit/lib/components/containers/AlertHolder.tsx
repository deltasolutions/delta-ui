import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export interface AlertHolderProps extends BoxProps {}

export const AlertHolder = forwardRef<HTMLDivElement, AlertHolderProps>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
        {...props}
      />
    );
  }
);
