import { keyframes } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { PortalledProps } from '../../../hooks';
import { Box, BoxProps } from '../Box';

export interface QuestionProps extends BoxProps, Partial<PortalledProps> {}

export const Question = forwardRef<HTMLDivElement, QuestionProps>(
  ({ children, ...rest }: QuestionProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          width: '350px',
          borderRadius: 3,
          backgroundColor: 'contrast',
          color: 'onContrast',
          animation: `${appear} 0.3s`,
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

const appear = keyframes({
  from: {
    transform: 'translateY(-4rem)',
    opacity: 0,
  },
});
