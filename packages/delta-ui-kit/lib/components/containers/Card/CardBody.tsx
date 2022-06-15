import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface CardBodyProps extends BoxProps {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          paddingY: 4,
          paddingX: 4,
        }}
        {...rest}
      />
    );
  }
);
