import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';
export interface BackgroundBaseProps extends HTMLAttributes<HTMLDivElement> {}
export const BackgroundBase = forwardRef<HTMLDivElement, BackgroundBaseProps>(
  ({ ...rest }: BackgroundBaseProps, ref) => {
    return (
      <Box
        ref={ref}
        {...rest}
        sx={{
          backgroundColor: 'background_base'
        }}
      />
    );
  }
);
