import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export interface BadgeProps extends BoxProps {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ color = 'primary', ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'inline-block',
          px: 2,
          py: 1,
          borderRadius: 4,
          ...{
            primary: {
              backgroundColor: 'primary',
              color: 'onPrimary',
            },
            secondary: {
              backgroundColor: 'secondary',
              color: 'onSecondary',
            },
            info: {
              backgroundColor: 'info',
              color: 'onInfo',
            },
            success: {
              backgroundColor: 'success',
              color: 'onSuccess',
            },
            warning: {
              backgroundColor: 'warning',
              color: 'onWarning',
            },
            error: {
              backgroundColor: 'error',
              color: 'onError',
            },
          }[color],
        }}
        {...rest}
      />
    );
  }
);
