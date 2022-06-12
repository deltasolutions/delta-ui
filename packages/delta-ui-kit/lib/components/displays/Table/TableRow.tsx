import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box, BoxProps } from '../../containers';

export interface TableRowPropsProps
  extends HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowPropsProps>(
  ({ ...rest }, ref) => {
    return (
      <tr
        ref={ref}
        role="row"
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&:hover, &:active, &:focus-visible': {
            backgroundColor: 'rgba(255,255,255,.02)',
          },
        }}
        {...rest}
      />
    );
  }
);
