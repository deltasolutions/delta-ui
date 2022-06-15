import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface TableCardHeaderProps extends BoxProps {}

export const TableCardHeader = forwardRef<HTMLDivElement, TableCardHeaderProps>(
  ({ ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          px: 4,
          backgroundColor: '#212221',
          py: 3,
          display: 'flex',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottom: '1px solid',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomColor: 'rgb(19, 19, 19)',
        }}
        {...rest}
      />
    );
  }
);
