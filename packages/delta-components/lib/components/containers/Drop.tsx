import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { PortalledProps } from '../../hooks';
import { Box, BoxProps } from './Box';

export interface DropProps extends BoxProps, Partial<PortalledProps> {}

export const Drop = forwardRef<HTMLDivElement, DropProps>(
  ({ context, handleClose, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          borderRadius: 2,
          backgroundColor: 'surface',
          color: 'onSurface',
          boxShadow: 1,
        }}
        {...rest}
      />
    );
  }
);
