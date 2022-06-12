import { jsx } from '@theme-ui/core';
import { forwardRef, ReactNode } from 'react';
import { Box, BoxProps } from '../../Box';
import { Heading } from '../../Heading';

export interface LayoutSidebarHeaderProps extends BoxProps {
  logo?: ReactNode;
}

export const LayoutSidebarHeader = forwardRef<
  HTMLDivElement,
  LayoutSidebarHeaderProps
>((props, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        flex: '0 0 auto',
        m: 2,
        my: 3,
        display: 'flex',
        alignItems: 'center',
        color: 'accentOnSurface',
        width: 'auto',
        height: 'auto',
      }}
      {...props}
    />
  );
});
