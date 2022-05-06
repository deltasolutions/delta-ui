import { keyframes } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';
export interface ConfirmProps extends BoxProps {}
export const Confirm = forwardRef<HTMLDivElement, ConfirmProps>(
  ({ children, ...rest }: ConfirmProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          animation: `${animation} 0.3s ease-out`,
          backgroundColor: 'text_base',
          width: '350px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: '8px'
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
const animation = keyframes`
  from {
    opacity: 0;
    transform: translateY(calc(-100% / 2));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
