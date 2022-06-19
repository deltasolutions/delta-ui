import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface LayoutProps extends BoxProps {}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ ...rest }: LayoutProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          width: '100%',
          minHeight: '100vh',
        }}
        {...rest}
      />
    );
  }
);
