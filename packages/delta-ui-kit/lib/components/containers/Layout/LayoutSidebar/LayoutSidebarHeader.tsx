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
        flex: '0 0 auto',
        paddingX: 4,
        width: '100%',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
      }}
      {...props}
    />
  );
});
