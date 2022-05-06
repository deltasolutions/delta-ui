import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
export interface TableProps extends HTMLAttributes<HTMLTableElement> {}
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ ...rest }: TableProps, ref) => {
    return <table ref={ref} sx={{ borderCollapse: 'collapse' }} {...rest} />;
  }
);
