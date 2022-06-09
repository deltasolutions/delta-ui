import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../../containers';

export interface DataGridBodyProps extends BoxProps {}

export const DataGridBody = forwardRef<HTMLDivElement, DataGridBodyProps>(
  ({ ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        role="thead"
        sx={{
          '& > div[role=row]:not(div[role=row]:last-child)': {
            borderBottomColor: 'rowSeparator',
            borderBottomStyle: 'solid',
            borderBottomWidth: '0.1px',
          },
        }}
        {...rest}
      />
    );
  }
);
