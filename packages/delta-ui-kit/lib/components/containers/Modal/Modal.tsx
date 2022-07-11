import { jsx, ThemeProvider } from '@theme-ui/core';
import { forwardRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { PortalledProps, useDeltaTheme } from '../../../hooks';
import { Button } from '../../Button';
import { Box, BoxProps } from '../Box';

export interface ModalProps extends BoxProps, Partial<PortalledProps> {
  size?: 'small' | 'medium' | 'large' | 'auto';
  closeVariant?: 'none' | 'inside' | 'outside';
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    { closeVariant = 'inside', handleClose, size = 'auto', children, ...rest },
    ref
  ) => {
    const theme = useDeltaTheme({
      colors: {
        context: 'celestial',
        accentContext: 'accentCelestial',
        onContext: 'onCelestial',
        accentOnContext: 'accentOnCelestial',
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
            backdropFilter: 'blur(20px)',
            ...{
              small: { width: '550px' },
              medium: { width: '650px' },
              large: { width: '750px' },
              auto: {},
            }[size],
          }}
          {...rest}
        >
          {closeVariant !== 'none' && (
            <Box
              sx={{
                position: 'absolute',
                ...{
                  inside: {
                    top: 2,
                    right: 2,
                  },
                  outside: {
                    top: 0,
                    right: -5,
                  },
                }[closeVariant],
              }}
            >
              <Button
                sx={{
                  borderRadius: '100px',
                  color: 'accentOnContext',
                  backgroundColor:
                    closeVariant === 'outside' ? 'transparent' : 'exterior',
                }}
                onClick={handleClose}
              >
                <IoMdClose size={24} />
              </Button>
            </Box>
          )}

          {children}
        </Box>
      </ThemeProvider>
    );
  }
);
