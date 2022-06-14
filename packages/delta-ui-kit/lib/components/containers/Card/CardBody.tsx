import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface CardBodyProps extends BoxProps {
  variant?: 'table';
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ variant, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          paddingY: 4,
          paddingX: variant === 'table' ? 0 : 4,
        }}
        {...rest}
      />
    );
  }
);
