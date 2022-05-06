import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';
import { Heading } from '../Heading';
export interface ConfirmHeaderProps extends BoxProps {}
export const ConfirmHeader = forwardRef<HTMLDivElement, ConfirmHeaderProps>(
  ({ children, ...rest }: ConfirmHeaderProps, ref) => {
    return (
      <Box ref={ref} {...rest}>
        <Heading level={3} sx={{ color: 'text_negative' }}>
          {children}
        </Heading>
      </Box>
    );
  }
);
