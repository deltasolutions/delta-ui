import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../../Box';

export interface LayoutNavigationContentProps extends BoxProps {}

export const LayoutNavigationContent = forwardRef<
  HTMLDivElement,
  LayoutNavigationContentProps
>(({ children, title, ...rest }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        overflowY: 'auto',
        background:
          'linear-gradient(#000000 33%, rgba(0,0,0, 0)), linear-gradient(rgba(0,0,0, 0), #000000 66%) 0 100%, linear-gradient(rgba(255,255,255, 0.06), rgba(0,0,0,0)), linear-gradient(rgba(0,0,0, 0), #000000 66%) 0 100%',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'local, local, scroll, scroll',
        backgroundSize: '100% 51px, 100% 51px, 100% 17px, 100% 17px',
      }}
      {...rest}
    >
      {children}
    </Box>
  );
});
