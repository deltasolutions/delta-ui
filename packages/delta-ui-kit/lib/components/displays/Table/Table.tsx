import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ ...rest }, ref) => {
    return (
      <table
        ref={ref}
        role="table"
        sx={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '0px',
          tableLayout: 'fixed',
          '.sticked-header': {
            '& > tr > th': {
              backgroundColor: '#181716',
            },
            boxShadow: 1,
          },
        }}
        {...rest}
      />
    );
  }
);
