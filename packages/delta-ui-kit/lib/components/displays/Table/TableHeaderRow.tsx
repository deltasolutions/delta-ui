import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';

export interface TableHeaderRowProps
  extends HTMLAttributes<HTMLTableRowElement> {}

export const TableHeaderRow = forwardRef<
  HTMLTableRowElement,
  TableHeaderRowProps
>(({ ...rest }, ref) => {
  return (
    <tr
      ref={ref}
      role="rowheader"
      sx={{
        py: 2,
        px: 4,
        backgroundColor: 'surface',
      }}
      {...rest}
    />
  );
});
