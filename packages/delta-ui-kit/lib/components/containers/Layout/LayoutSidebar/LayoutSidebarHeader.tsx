import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../../Box';

export interface LayoutSidebarHeaderProps extends BoxProps {}

export const LayoutSidebarHeader = forwardRef<
  HTMLDivElement,
  LayoutSidebarHeaderProps
>((props, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        m: 3,
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        color: 'accentOnContext',
        width: 'auto',
        height: 'auto',
      }}
      {...props}
    />
  );
});
