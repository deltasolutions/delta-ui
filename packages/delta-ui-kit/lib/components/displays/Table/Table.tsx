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
          '.active-sticky-header': {
            '& > tr': {
              backgroundColor: 'surface',
              borderBottom: '1px solid',
              borderBottomColor: 'border',
              boxShadow: 1,
            },
          },
        }}
        {...rest}
      />
    );
  }
);
