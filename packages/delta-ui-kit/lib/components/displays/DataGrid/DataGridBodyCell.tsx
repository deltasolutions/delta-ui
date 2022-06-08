import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box, BoxProps } from '../../containers';

export interface TableBodyCellProps extends BoxProps {}

export const DataGridBodyCell = forwardRef<HTMLDivElement, TableBodyCellProps>(
  ({ ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        role="cell"
        sx={{ color: 'accentContrast', fontSize: 3 }}
        {...rest}
      />
    );
  }
);
