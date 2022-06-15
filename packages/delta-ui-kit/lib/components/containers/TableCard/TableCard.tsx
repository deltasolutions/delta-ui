import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface TableCardProps extends BoxProps {}

export const TableCard = forwardRef<HTMLDivElement, TableCardProps>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        sx={{ borderRadius: 4, backgroundColor: 'surface' }}
        {...props}
      />
    );
  }
);
