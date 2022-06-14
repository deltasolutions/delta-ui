import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'table';
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ variant, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          paddingX: variant === 'table' ? 4 : 4,
          paddingTop: 4,
          color: 'accentOnSurface',
        }}
        {...rest}
      />
    );
  }
);
