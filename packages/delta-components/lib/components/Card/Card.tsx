import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large' | 'auto';
}
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, size = 'medium', ...rest }: CardProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          borderRadius: '4px',
          width: '100%',
          ...{
            small: { maxWidth: '400px' },
            medium: { maxWidth: '600px' },
            large: { maxWidth: '800px' },
            auto: {}
          }[size],
          backgroundColor: 'rgb(24, 24, 24)'
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
