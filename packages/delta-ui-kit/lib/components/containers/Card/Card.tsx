import { jsx, ThemeProvider } from '@theme-ui/core';
import { forwardRef } from 'react';
import { useDeltaTheme } from '../../../hooks';
import { Box, BoxProps } from '../Box';

export interface CardProps extends BoxProps {}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const theme = useDeltaTheme({
    colors: {
      context: 'surface',
      accentContext: 'accentSurface',
      onContext: 'onSurface',
      accentOnContext: 'accentOnSurface',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        ref={ref}
        sx={{
          borderRadius: 4,
          backgroundColor: 'context',
          color: 'onContext',
        }}
        {...props}
      />
    </ThemeProvider>
  );
});
