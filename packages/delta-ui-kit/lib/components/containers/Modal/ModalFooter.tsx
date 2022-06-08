import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          gap: 2,
          paddingX: 5,
          paddingBottom: 4,
        }}
        {...props}
      />
    );
  }
);
