import { jsx, ThemeProvider } from '@theme-ui/core';
import { forwardRef } from 'react';
import { PortalledProps, useDeltaTheme } from '../../../hooks';
import { Box, BoxProps } from '../Box';

export interface ModalProps extends BoxProps, Partial<PortalledProps> {
  variant?: 'page';
  size?: 'small' | 'medium' | 'large';
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ variant, size = 'medium', ...rest }, ref) => {
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
            ...{
              page: { width: '100vw', height: '100vh' },
            }[variant ?? ''],
            ...{
              small: { width: '550px' },
              medium: { width: '650px' },
              large: { width: '750px' },
            }[size],
          }}
          {...rest}
        />
      </ThemeProvider>
    );
  }
);
