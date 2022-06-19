import { keyframes } from '@emotion/react';
import { ThemeProvider } from '@theme-ui/core';
import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { PortalledProps, useDeltaTheme } from '../../../hooks';
import { Box, BoxProps } from '../Box';

export interface QuestionProps extends BoxProps, Partial<PortalledProps> {}

export const Question = forwardRef<HTMLDivElement, QuestionProps>(
  ({ children, ...rest }: QuestionProps, ref) => {
    const theme = useDeltaTheme({
      colors: {
        context: 'contrast',
        accentContext: 'accentContrast',
        onContext: 'onContrast',
        accentOnContext: 'accentOnContrast',
      },
    });
    return (
      <ThemeProvider theme={theme}>
        <Box
          ref={ref}
          sx={{
            width: '350px',
            borderRadius: 4,
            backgroundColor: 'context',
            color: 'onContext',
            animation: `${appear} 0.25s`,
          }}
          {...rest}
        >
          {children}
        </Box>
      </ThemeProvider>
    );
  }
);

const appear = keyframes({
  from: {
    transform: 'translateY(-3rem)',
    opacity: 0,
  },
});
