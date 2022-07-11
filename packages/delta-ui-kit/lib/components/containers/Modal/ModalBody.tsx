import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface ModalBodyProps extends BoxProps {
  variant?: 'wide';
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ variant, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
<<<<<<< HEAD
          paddingX: variant === 'wide' ? 0 : 5,
=======
          scrollbarWidth: 'thin',
          paddingX: 5,
>>>>>>> ba993cc5b751c8d5133aef93c772d22f5898ea00
          paddingY: 4,
        }}
        {...rest}
      />
    );
  }
);
