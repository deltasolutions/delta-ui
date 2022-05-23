import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes, InputHTMLAttributes } from 'react';
import { Box, BoxProps } from '../../Box';
export interface LayoutNavbarBodyProps extends BoxProps {}

export const LayoutNavbarBody = forwardRef<
  HTMLDivElement,
  LayoutNavbarBodyProps
>(({ children, ...rest }: LayoutNavbarBodyProps, ref) => {
  return (
    <Box ref={ref} {...rest}>
      {children}
    </Box>
  );
});
