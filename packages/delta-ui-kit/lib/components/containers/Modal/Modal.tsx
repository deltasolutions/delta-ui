import { jsx, ThemeProvider } from '@theme-ui/core';
import { forwardRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { PortalledProps, useDeltaTheme } from '../../../hooks';
import { Button } from '../../Button';
import { Box, BoxProps } from '../Box';

export interface ModalProps extends BoxProps, Partial<PortalledProps> {
  size?: 'small' | 'medium' | 'large';
  closeVariant?: 'inside';
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ closeVariant, size, children, handleClose, ...rest }, ref) => {
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
            }[size ?? ''],
          }}
          {...rest}
        >
          {closeVariant === 'inside' && (
            <Box
              sx={{
                position: 'absolute',
                ...{
                  inside: { top: 2, right: 2 },
                  outside: { top: 0, right: -5 },
                }[closeVariant],
              }}
            >
              <Button
                sx={{
                  display: 'flex',
                  borderRadius: '100px',
                  color: 'onContext',
                  p: '3px',
                  minWidth: 'fit-content',
                  backgroundColor: 'accentContext',
                  '&:hover': {
                    color: 'accentOnContext',
                  },
                }}
                onClick={handleClose}
              >
                <IoMdClose size={20} />
              </Button>
            </Box>
          )}

          {children}
        </Box>
      </ThemeProvider>
    );
  }
);
