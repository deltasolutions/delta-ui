import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';
export interface TableHeadRowProps
  extends HTMLAttributes<HTMLTableRowElement> {}
export const TableHeadRow = forwardRef<HTMLTableRowElement, TableHeadRowProps>(
  ({ ...rest }: TableHeadRowProps, ref) => {
    return <tr ref={ref} {...rest} />;
  }
);
