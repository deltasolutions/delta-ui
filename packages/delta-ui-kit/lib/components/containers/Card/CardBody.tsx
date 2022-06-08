import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface CardBodyProps extends BoxProps {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  (props, ref) => {
    return <Box ref={ref} sx={{ paddingX: 4, paddingY: 3 }} {...props} />;
  }
);