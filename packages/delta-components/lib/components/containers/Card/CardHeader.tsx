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
          paddingX: 5,
          paddingTop: 5,
          color: 'accentOnSurface',
        }}
        {...props}
      />
    );
  }
);
