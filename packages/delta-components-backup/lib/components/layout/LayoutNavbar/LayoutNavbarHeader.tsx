import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes, InputHTMLAttributes } from 'react';
import { Box } from '../../Box';
export interface LayoutNavbarTitleProps
  extends HTMLAttributes<HTMLDivElement> {}

export const LayoutNavbarHeader = forwardRef<
  HTMLDivElement,
  LayoutNavbarTitleProps
>(({ children, ...rest }: LayoutNavbarTitleProps, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        paddingTop: '24px',
        paddingX: '24px',
        width: '100%',
        marginBottom: '18px'
      }}
      {...rest}
    >
      {children}
    </Box>
  );
});
