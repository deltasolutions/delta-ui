import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';

export interface TableBodyCellProps
  extends HTMLAttributes<HTMLTableCellElement> {}

export const TableBodyCell = forwardRef<
  HTMLTableCellElement,
  TableBodyCellProps
>(({ children, ...rest }, ref) => {
  return (
    <td
      ref={ref}
      role="cell"
      sx={{
        color: 'onSurface',
        fontSize: 2,
        display: 'flex',
        alignItems: 'center',
      }}
      {...rest}
    >
      <span
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          color: '#a7a7a7',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
    </td>
  );
});
