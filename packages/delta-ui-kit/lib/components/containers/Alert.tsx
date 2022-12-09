import { keyframes } from '@emotion/react';
import { jsx, ThemeProvider } from '@theme-ui/core';
import { forwardRef, useMemo } from 'react';
import { IoClose } from 'react-icons/io5';
import { useDeltaTheme } from '../../hooks';
import { Button } from '../Button';
import { Box, BoxProps } from './Box';

export interface AlertProps extends BoxProps {
  onClose?: () => void;
  color?: 'info' | 'success' | 'warning' | 'error';
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ color = 'info', onClose, children, ...rest }, ref) => {
    const overrides = useMemo(
      () => ({
        colors:
          {
            info: {
              context: 'info',
              accentContext: 'accentInfo',
              onContext: 'onInfo',
              accentOnContext: 'accentOnInfo',
            },
            success: {
              context: 'success',
              accentContext: 'accentSuccess',
              onContext: 'onSuccess',
              accentOnContext: 'accentOnSuccess',
            },
            error: {
              context: 'error',
              accentContext: 'accentError',
              onContext: 'onError',
              accentOnContext: 'accentOnError',
            },
            warning: {
              context: 'warning',
              accentContext: 'accentWarning',
              onContext: 'onWarning',
              accentOnContext: 'accentOnWarning',
            },
          }[color] ?? undefined,
      }),
      [color]
    );
    const theme = useDeltaTheme(overrides);
    return (
      <ThemeProvider theme={theme}>
        <Box
          ref={ref}
          sx={{
            display: 'inline-flex',
            alignItems: 'flex-start',
            borderRadius: 4,
            paddingX: 2,
            width: '100%',
            backgroundColor: 'context',
            color: 'onContext',
            animation: `${slideIn} 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)`,
          }}
          {...rest}
        >
          <span
            sx={{
              overflow: 'hidden',
              wordBreak: 'break-word',
              paddingY: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {children}
          </span>
          {onClose && (
            <Button
              sx={{
                mt: '7px',
                ml: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 1,
                minWidth: 1,
                borderRadius: '100%',
                '&:hover, &:focus-visible': {
                  backgroundColor: 'accentContext',
                },
              }}
              onClick={onClose}
            >
              <IoClose size={18} />
            </Button>
          )}
        </Box>
      </ThemeProvider>
    );
  }
);
const slideIn = keyframes({
  from: {
    transform: 'scale(0.85)',
  },
  to: {
    transform: 'scale(1)',
  },
});
