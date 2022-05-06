import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';
import { Paragraph } from '../Paragraph';
export interface ConfirmBodyProps extends BoxProps {}
export const ConfirmBody = forwardRef<HTMLDivElement, ConfirmBodyProps>(
  ({ children, ...rest }: ConfirmBodyProps, ref) => {
    return (
      <Box ref={ref} {...rest}>
        <Paragraph sx={{ color: 'text_opposite_subdued' }}>
          {children}
        </Paragraph>
      </Box>
    );
  }
);
