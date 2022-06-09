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
        flex: '1 1 auto',
        minHeight: 0,
        height: '100%',
        paddingBottom: 5,
        width: '100%',
      }}
      {...props}
    />
  );
});
