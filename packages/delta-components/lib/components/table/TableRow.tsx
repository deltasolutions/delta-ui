import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ ...rest }: TableRowProps, ref) => {
    return (
      <tr
        ref={ref}
        sx={{
          '& > td:first-child': {
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
          },
          '& > td:last-child': {
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5
          },
          '&:hover, &:active, &:focus-visible': { backgroundColor: '#2b2b2a' }
        }}
        {...rest}
      />
    );
  }
);
