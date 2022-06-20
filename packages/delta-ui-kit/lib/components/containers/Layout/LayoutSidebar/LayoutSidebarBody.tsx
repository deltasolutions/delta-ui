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
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          backgroundColor: 'accentExterior',
          width: '8px',
        },
        '&::-webkit-scrollbar-track': { backgroundColor: 'context' },
        '&::-webkit-scrollbar-track:hover': {
          backgroundColor: 'context',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'accentContext',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'onContext',
        },
        '&::-webkit-scrollbar-button': { display: 'none' },
      }}
      {...props}
    />
  );
});
