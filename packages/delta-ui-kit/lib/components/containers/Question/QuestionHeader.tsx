import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface QuestionHeaderProps extends BoxProps {}

export const QuestionHeader = forwardRef<HTMLDivElement, QuestionHeaderProps>(
  (props: QuestionHeaderProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          paddingX: 4,
          paddingTop: 3,
          '& > h4': {
            color: 'accentOnContrast',
          },
        }}
        {...props}
      />
    );
  }
);
