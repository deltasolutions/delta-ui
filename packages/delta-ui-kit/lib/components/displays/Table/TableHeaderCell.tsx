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
        position: 'relative',
        gap: 1,
        py: '9px',
        width: 'auto',
        borderBottom: '1px solid',
        borderBottomColor: 'border',
        px: 2,
      }}
      {...rest}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          color: 'onSurface',
          fontWeight: 300,
          pr: 1,
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </th>
  );
});