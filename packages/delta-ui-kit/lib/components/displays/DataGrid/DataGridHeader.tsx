import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../../containers';

export interface DataGridHeaderProps extends BoxProps {}

export const DataGridHeader = forwardRef<HTMLDivElement, DataGridHeaderProps>(
  ({ ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        role="thead"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          py: 2,
          minHeight: '40px',
          px: 3,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottom: '1px solid',
          borderBottomColor: 'border',
        }}
        {...rest}
      />
    );
  }
);
