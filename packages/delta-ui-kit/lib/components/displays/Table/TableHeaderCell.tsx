import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { Box, BoxProps } from '../../containers';

export interface TableHeaderCellProps
  extends HTMLAttributes<HTMLTableCellElement> {
  label?: ReactNode;
}

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(({ children, ...rest }, ref) => {
  return (
    <th
      ref={ref}
      role="cell"
      sx={{
        color: 'onSurfacee',
        position: 'relative',
        fontWeight: 300,
        gap: 1,
        py: 2,
        px: 4,
        borderBottom: '1px solid',
        borderBottomColor: 'border',
      }}
      {...rest}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          pr: 1,
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </th>
  );
});
