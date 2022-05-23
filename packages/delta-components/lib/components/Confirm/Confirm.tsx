import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { PortalledTransitionerProps } from '../../hooks';
import { Box, BoxProps } from '../Box';

export interface ConfirmProps
  extends BoxProps,
    Partial<PortalledTransitionerProps> {}

export const Confirm = forwardRef<HTMLDivElement, ConfirmProps>(
  ({ children, isVisible, isEntering, ...rest }: ConfirmProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          width: '400px',
          borderRadius: 3,
          backgroundColor: 'contrast',
          color: 'onContrast',
          transform: `translateY(${
            isVisible ? '0' : isEntering ? '1rem' : '-1rem'
          })`,
          transition: 'transform 0.2s',
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
