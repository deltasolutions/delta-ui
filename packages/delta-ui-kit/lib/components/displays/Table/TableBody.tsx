import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box, BoxProps } from '../../containers';

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ ...rest }, ref) => {
    return (
      <tbody
        ref={ref}
        role="thead"
        sx={{
          color: '#b3b3b3',
          '& > div[role=row]': {
            borderBottom: '1px solid',
            borderBottomColor: 'border',
          },
          '& > tr:nth-child(even)': {
            backgroundColor: '#181716',
          },
        }}
        {...rest}
      />
    );
  }
);
