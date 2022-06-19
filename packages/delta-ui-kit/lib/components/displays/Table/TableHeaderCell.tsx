import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes, ReactNode, useContext } from 'react';
import { Box } from '../../containers';
import { TableHeaderContext } from './TableHeader';

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
        px: 2,
        py: '0.75em',
        width: 'auto',
        '&:first-of-type': { pl: 4 },
        '&:last-of-type': { pr: 4 },
      }}
      {...rest}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pr: 1,
          fontSize: 1,
          fontWeight: 300,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {children}
      </Box>
    </th>
  );
});
