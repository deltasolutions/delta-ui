import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface CardProps extends BoxProps {}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        borderRadius: 4,
        backgroundColor: 'surface',
        color: 'onSurface',
      }}
      {...props}
    />
  );
});
