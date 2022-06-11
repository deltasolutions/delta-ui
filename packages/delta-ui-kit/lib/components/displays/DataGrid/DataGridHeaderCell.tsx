import { jsx } from '@theme-ui/core';
import { forwardRef, ReactNode } from 'react';
import { Box, BoxProps } from '../../containers';

export interface DataGridHeaderCellProps extends BoxProps {
  label?: ReactNode;
}

export const DataGridHeaderCell = forwardRef<
  HTMLDivElement,
  DataGridHeaderCellProps
>(({ label, ...rest }, ref) => {
  return (
    <Box
      ref={ref}
      role="cell"
      sx={{
        color: 'onSurfacee',
        display: 'flex',
        alignItems: 'flex-start',
        fontWeight: 500,
        gap: 1,
      }}
      {...rest}
    >
      <span>{label}</span>
    </Box>
  );
});
