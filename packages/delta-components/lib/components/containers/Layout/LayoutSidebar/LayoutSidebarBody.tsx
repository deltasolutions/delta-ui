import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../../Box';

export interface LayoutSidebarBodyProps extends BoxProps {}

export const LayoutSidebarBody = forwardRef<
  HTMLDivElement,
  LayoutSidebarBodyProps
>((props, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        paddingTop: 5,
        paddingBottom: 5,
        width: '100%',
        height: '100%',
        overflow: 'scroll',
      }}
      {...props}
    />
  );
});
