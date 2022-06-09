import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          paddingX: 4,
          paddingTop: 4,
          // color: 'accentOnSurface',
        }}
        {...props}
      />
    );
  }
);
