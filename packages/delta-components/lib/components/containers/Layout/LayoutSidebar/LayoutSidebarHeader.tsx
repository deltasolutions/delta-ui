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
        paddingX: 4,
        paddingTop: 5,
        width: '100%',
      }}
      {...props}
    />
  );
});
