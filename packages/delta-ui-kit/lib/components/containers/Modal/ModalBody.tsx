import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface ModalBodyProps extends BoxProps {}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          scrollbarWidth: 'thin',
          paddingX: 5,
          paddingY: 4,
        }}
        {...props}
      />
    );
  }
);
