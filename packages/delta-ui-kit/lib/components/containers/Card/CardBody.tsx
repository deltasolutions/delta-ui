import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface CardBodyProps extends BoxProps {
  variant?: 'wide';
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ variant, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          py: 0,
          px: variant === 'wide' ? 0 : 4,
          '& + &': { pt: 3 },
          '&:first-of-type': { pt: 3 },
          '&:last-of-type': { pb: 3 },
        }}
        {...rest}
      />
    );
  }
);
