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
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        fontWeight: 500,
        gap: 1,
      }}
      {...rest}
    >
      <span
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
    </th>
  );
});
