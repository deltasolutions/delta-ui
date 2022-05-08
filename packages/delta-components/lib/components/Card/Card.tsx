import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large' | 'auto';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, size = 'auto', ...rest }: CardProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          borderRadius: '4px',
          ...{
            small: { width: '400px' },
            medium: { width: '600px' },
            large: { width: '800px' },
            auto: { width: '100%' }
          }[size],
          backgroundColor: 'surface'
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
