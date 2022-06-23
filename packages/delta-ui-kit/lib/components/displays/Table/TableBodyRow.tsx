import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { useTableAccentContextColor } from './useTableAccentContextColor';

export interface TableBodyRowProps
  extends HTMLAttributes<HTMLTableRowElement> {}

export const TableBodyRow = forwardRef<HTMLTableRowElement, TableBodyRowProps>(
  ({ ...rest }, ref) => {
    const backgroundColor = useTableAccentContextColor();
    return (
      <tr
        ref={ref}
        role="row"
        sx={{
          '&:nth-of-type(even)': { backgroundColor },
        }}
        {...rest}
      />
    );
  }
);
