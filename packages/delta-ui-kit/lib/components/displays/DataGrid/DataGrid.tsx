import { table } from 'console';
import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box, BoxProps } from '../../containers';

export interface DataGridProps extends BoxProps {}

export const DataGrid = forwardRef<HTMLDivElement, DataGridProps>(
  ({ ...rest }, ref) => {
    return <Box ref={ref} role="table" {...rest} />;
  }
);
