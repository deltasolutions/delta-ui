import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface TableCardBodyProps extends BoxProps {}

export const TableCardBody = forwardRef<HTMLDivElement, TableCardBodyProps>(
  (props, ref) => {
    return <Box {...props} ref={ref} sx={{ pb: 1 }} />;
  }
);
