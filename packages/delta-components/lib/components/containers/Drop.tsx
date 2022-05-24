import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { PortalledTransitionerProps } from '../../hooks';
import { Box, BoxProps } from './Box';

export interface DropProps
  extends BoxProps,
    Partial<PortalledTransitionerProps> {}

export const Drop = forwardRef<HTMLDivElement, DropProps>(
  ({ context, isVisible, isEntering, handleClose, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          borderRadius: 2,
          backgroundColor: 'surface',
          color: 'onSurface',
          boxShadow: 1,
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? '0' : '-1rem'})`,
          transition: 'opacity 0.2s, transform 0.2s',
        }}
        {...rest}
      />
    );
  }
);
