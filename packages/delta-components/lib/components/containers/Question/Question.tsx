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
          width: '400px',
          borderRadius: 3,
          backgroundColor: 'contrast',
          color: 'onContrast',
          animation: `${appear} 0.2s`,
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
    transform: 'scale(0.9) translateY(1rem)',
    opacity: 0,
  },
});
