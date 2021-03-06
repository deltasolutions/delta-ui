import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          paddingX: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 3,
          py: 3,
          flexWrap: 'wrap',
        }}
        {...rest}
      />
    );
  }
);
