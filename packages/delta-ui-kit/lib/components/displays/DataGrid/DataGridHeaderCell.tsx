import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../../containers';

export interface DataGridHeaderCellProps extends BoxProps {}

export const DataGridHeaderCell = forwardRef<
  HTMLDivElement,
  DataGridHeaderCellProps
>(({ ...rest }, ref) => {
  return (
    <Box
      ref={ref}
      role="cell"
      sx={{
        color: 'accentOnSurface',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
      }}
      {...rest}
    />
  );
});
