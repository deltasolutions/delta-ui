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
          backgroundColor: 'outline',
          width: '8px',
        },
        '&::-webkit-scrollbar-track': { backgroundColor: 'exterior' },
        '&::-webkit-scrollbar-track:hover': {
          backgroundColor: 'exterior',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#ffffff',
        },
        '&::-webkit-scrollbar-button': { display: 'none' },
      }}
      {...props}
    />
  );
});
