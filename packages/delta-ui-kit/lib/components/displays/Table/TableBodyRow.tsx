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
          py: 3,
          px: 4,
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
