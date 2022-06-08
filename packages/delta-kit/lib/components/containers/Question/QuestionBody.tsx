import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface QuestionBodyProps extends BoxProps {}

export const QuestionBody = forwardRef<HTMLDivElement, QuestionBodyProps>(
  ({ children, ...rest }: QuestionBodyProps, ref) => {
    return (
      <Box ref={ref} {...rest}>
        <Box sx={{ paddingX: 4, paddingY: 3 }}>{children}</Box>
      </Box>
    );
  }
);
