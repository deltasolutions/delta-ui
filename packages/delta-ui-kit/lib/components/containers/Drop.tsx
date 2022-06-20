import { jsx, ThemeProvider } from '@theme-ui/core';
import { lighten } from 'polished';
import { forwardRef, useMemo } from 'react';
import { PortalledProps, useDeltaTheme } from '../../hooks';
import { Box, BoxProps } from './Box';

export interface DropProps extends BoxProps, Partial<PortalledProps> {}

export const Drop = forwardRef<HTMLDivElement, DropProps>(
  ({ context, handleClose, ...rest }, ref) => {
    const { colors } = useDeltaTheme();
    const overrides = useMemo(() => {
      const value = 0.065;
      return {
        colors: {
          context: lighten(value, colors.context),
          accentContext: lighten(value, colors.accentContext),
          onContext: lighten(value, colors.onContext),
          accentOnContext: lighten(value, colors.accentOnContext),
        },
      };
    }, [colors]);
    const theme = useDeltaTheme(overrides);
    return (
      <ThemeProvider theme={theme}>
        <Box
          ref={ref}
          sx={{
            backgroundColor: 'context',
            color: 'onContext',
            boxShadow: 1,
            borderRadius: 4,
          }}
          {...rest}
        />
      </ThemeProvider>
    );
  }
);
