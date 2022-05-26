import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { PortalledProps } from '../../../hooks';
import { Box, BoxProps } from '../Box';

export interface ModalProps extends BoxProps, Partial<PortalledProps> {
  variant?: 'page';
  size?: 'small' | 'medium' | 'large';
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ variant, size = 'medium', ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          borderRadius: 3,
          backgroundColor: 'surface',
          color: 'onSurface',
          ...{
            page: { width: '100vw', height: '100vh' },
          }[variant ?? ''],
          ...{
            small: { width: '550px' },
            medium: { width: '650px' },
            large: { width: '750px' },
          }[size],
        }}
        {...rest}
      />
    );
  }
);
