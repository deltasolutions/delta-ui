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
        '& > th:first-of-type': {
          pl: 4,
        },
        '& > th:last-of-type': {
          pr: 4,
        },
      }}
      {...rest}
    />
  );
});
