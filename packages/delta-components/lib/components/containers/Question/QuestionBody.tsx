import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface QuestionBodyProps extends BoxProps {}

export const QuestionBody = forwardRef<HTMLDivElement, QuestionBodyProps>(
  ({ children, ...rest }: QuestionBodyProps, ref) => {
    return (
      <Box ref={ref} {...rest}>
        <Box sx={{ paddingX: 5, paddingY: 4 }}>{children}</Box>
      </Box>
    );
  }
);
