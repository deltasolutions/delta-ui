import { jsx, ThemeProvider } from '@theme-ui/core';
import { lighten, transparentize } from 'polished';
import { forwardRef, useMemo } from 'react';
import { PortalledProps, useDeltaTheme } from '../../hooks';
import { Button, ButtonProps } from '../Button';
import { Box, BoxProps } from './Box';

export interface DropProps extends BoxProps, Partial<PortalledProps> {}

export const Drop = forwardRef<HTMLDivElement, DropProps>(
  ({ context, handleClose, ...rest }, ref) => {
    const { colors } = useDeltaTheme();
    const overrides = useMemo(() => {
      const value = 0.065;
      return {
        colors: {
          context: lighten(value, colors.celestial),
          accentContext: lighten(value, colors.accentCelestial),
          onContext: lighten(value, colors.onCelestial),
          accentOnContext: lighten(value, colors.accentOnCelestial),
        },
      };
    }, [colors]);
    const theme = useDeltaTheme(overrides);
    return (
      <ThemeProvider theme={theme}>
        <Box
          ref={ref}
          sx={{
            zIndex: 1,
            position: 'relative',
            backgroundColor: 'context',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 1,
            borderRadius: 4,
          }}
          {...rest}
        />
      </ThemeProvider>
    );
  }
);

export interface DropOptionProps extends ButtonProps {
  size?: 'small' | 'medium';
}

export const DropOption = forwardRef<HTMLButtonElement, DropOptionProps>(
  ({ size = 'medium', ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        sx={{
          height: size === 'medium' ? 3 : 2,
          width: '200px',
          display: 'flex',
          px: '16px',
          fontFamily: 'Montserrat, sans-serif',
          alignItems: 'center',
          gap: 2,
          borderRadius: 3,
          '&:hover, &:focus, &:active': {
            backgroundColor: 'accentContext',
            color: 'accentOnContext',
          },
          color: 'onContext',
        }}
        {...rest}
      />
    );
  }
);
