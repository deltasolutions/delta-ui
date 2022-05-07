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
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4
          },
          '& > td:last-child': {
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4
          },
          '&:hover, &:active, &:focus-visible': {
            backgroundColor: 'surfaceTint'
          }
        }}
        {...rest}
      />
    );
  }
);
