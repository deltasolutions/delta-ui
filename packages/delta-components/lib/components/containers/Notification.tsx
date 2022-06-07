import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { PortalledTransitionProps } from '../../hooks';
import { Box, BoxProps } from './Box';

export interface NotificationProps
  extends BoxProps,
    Partial<PortalledTransitionProps> {
  color?: 'primary' | 'secondary' | 'success' | 'error';
}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    { color = 'primary', context, handleClose, isVisible, isEntering, ...rest },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        sx={{
          m: 3,
          p: 2,
          width: '350px',
          borderRadius: 4,
          boxShadow: 1,
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${
            isVisible ? '0' : isEntering ? '0.7rem' : '-0.7rem'
          })`,
          transition: [
            'opacity 0.2s linear',
            'transform 0.2s linear',
            'top 0.3s ease',
            'bottom 0.3s ease',
          ].join(', '),
          ...{
            primary: {
              backgroundColor: 'primary',
              color: 'onPrimary',
              '&:hover': { backgroundColor: 'accentPrimary' },
            },
            secondary: {
              backgroundColor: 'secondary',
              color: 'onSecondary',
              '&:hover': { backgroundColor: 'accentSecondary' },
            },
            success: {
              backgroundColor: 'success',
              color: 'onSuccess',
              '&:hover': { backgroundColor: 'accentSuccess' },
            },
            error: {
              backgroundColor: 'error',
              color: 'onError',
              '&:hover': { backgroundColor: 'accentError' },
            },
          }[color],
        }}
        onClick={handleClose}
        {...rest}
      />
    );
  }
);
