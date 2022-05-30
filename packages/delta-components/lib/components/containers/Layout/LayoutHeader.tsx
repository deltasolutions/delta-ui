import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface LayoutHeaderProps extends BoxProps {}

export const LayoutHeader = forwardRef<HTMLDivElement, LayoutHeaderProps>(
  (props: LayoutHeaderProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          width: '100%',
          gridArea: 'header',
          position: 'sticky',
          height: '64px',
          top: 0,
          zIndex: 2,
          '& > div': {
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingX: '32px',
          },
        }}
        {...props}
      />
    );
  }
);
