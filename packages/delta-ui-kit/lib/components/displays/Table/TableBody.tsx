import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box, BoxProps } from '../../containers';

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ ...rest }, ref) => {
    return (
      <tbody ref={ref} role="tbody" sx={{ color: 'onContext' }} {...rest} />
    );
  }
);
