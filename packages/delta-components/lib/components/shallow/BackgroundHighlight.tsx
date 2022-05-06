import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';
export interface BackgroundHighlightProps
  extends HTMLAttributes<HTMLDivElement> {}
export const BackgroundHighlight = forwardRef<
  HTMLDivElement,
  BackgroundHighlightProps
>(({ ...rest }: BackgroundHighlightProps, ref) => {
  return (
    <Box
      ref={ref}
      {...rest}
      sx={{
        backgroundColor: 'background_base'
      }}
    />
  );
});
