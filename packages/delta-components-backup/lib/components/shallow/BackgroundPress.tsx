import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';
export interface BackgroundPressProps extends HTMLAttributes<HTMLDivElement> {}
export const BackgroundPress = forwardRef<HTMLDivElement, BackgroundPressProps>(
  ({ ...rest }: BackgroundPressProps, ref) => {
    return (
      <Box
        {...rest}
        ref={ref}
        sx={{
          backgroundColor: 'background_press',
          '&:hover, &:active, &:focus-visible': {
            backgroundColor: 'background_elevated_press'
          }
        }}
      />
    );
  }
);
