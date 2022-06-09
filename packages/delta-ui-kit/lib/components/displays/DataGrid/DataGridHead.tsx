import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../../containers';

export interface DataGridHeadProps extends BoxProps {}

export const DataGridHead = forwardRef<HTMLDivElement, DataGridHeadProps>(
  ({ ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        role="thead"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: '12px 16px',
          h: 3,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomColor: 'rowSeparator',
          borderBottomStyle: 'solid',
          borderBottomWidth: '0.1px',
        }}
        {...rest}
      />
    );
  }
);
