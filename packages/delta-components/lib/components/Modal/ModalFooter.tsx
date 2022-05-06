import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { MODAL_PADDING } from '../../variables';
import { Box } from '../Box';
export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          padding: `${MODAL_PADDING}px`
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
