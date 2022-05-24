import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { PortalledTransitionerProps } from '../../../hooks';
import { Box, BoxProps } from '../Box';

export interface QuestionProps
  extends BoxProps,
    Partial<PortalledTransitionerProps> {}

export const Question = forwardRef<HTMLDivElement, QuestionProps>(
  ({ children, isVisible, isEntering, ...rest }: QuestionProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          width: '400px',
          borderRadius: 3,
          backgroundColor: 'contrast',
          color: 'onContrast',
          transform: `translateY(${
            isVisible ? '0' : isEntering ? '1rem' : '-1rem'
          })`,
          transition: 'transform 0.2s',
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
