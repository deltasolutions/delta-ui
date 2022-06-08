import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface QuestionFooterProps extends BoxProps {}

export const QuestionFooter = forwardRef<HTMLDivElement, QuestionFooterProps>(
  ({ children, ...rest }: QuestionFooterProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: 3,
          paddingX: 4,
          paddingBottom: 3,
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
