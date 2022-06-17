import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box, BoxProps } from '../../containers';

export interface TableBodyRowProps
  extends HTMLAttributes<HTMLTableRowElement> {}

export const TableBodyRow = forwardRef<HTMLTableRowElement, TableBodyRowProps>(
  ({ ...rest }, ref) => {
    return (
      <tr
        ref={ref}
        role="row"
        sx={{
          '& > td:first-of-type': {
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            pl: 4,
          },
          '& > td:last-of-type': {
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            pr: 4,
          },
        }}
        {...rest}
      />
    );
  }
);
