import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';

export interface TableBodyRowProps
  extends HTMLAttributes<HTMLTableRowElement> {}

export const TableBodyRow = forwardRef<HTMLTableRowElement, TableBodyRowProps>(
  ({ ...rest }, ref) => {
    return <tr ref={ref} role="row" {...rest} />;
  }
);
