import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {}
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ ...rest }: TableBodyProps, ref) => {
    return (
      <tbody
        ref={ref}
        sx={{
          '&:before': {
            content: '"@"',
            display: 'block',
            lineHeight: '8px',
            textIndent: '-99999px'
          }
        }}
        {...rest}
      />
    );
  }
);
