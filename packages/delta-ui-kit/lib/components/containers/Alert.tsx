import { keyframes } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { Button } from '../Button';
import { Box, BoxProps } from './Box';

export interface AlertProps extends BoxProps {
  color?: 'info' | 'warning' | 'success' | 'error';
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ color = 'primary', onClose, children, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          borderRadius: 4,
          paddingX: 2,
          animation: `${slideIn} 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)`,
          ...{
            info: {
              backgroundColor: 'info',
              color: 'onInfo',
            },
            warning: {
              backgroundColor: 'warning',
              color: 'onWarning',
            },
            success: {
              backgroundColor: 'success',
              color: 'onSuccess',
            },
            error: {
              backgroundColor: 'error',
              color: 'onError',
            },
          }[color],
        }}
        {...rest}
      >
        <span
          sx={{
            paddingY: 2,
            fontWeight: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {children}
        </span>
        <Button
          sx={{
            mt: 2,
            ml: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 1,
            minWidth: 1,
            borderRadius: '100%',
            '&:hover': {
              backgroundColor: {
                info: 'accentInfo',
                warning: 'accentWarning',
                success: 'accentSuccess',
                error: 'accentError',
              }[color],
            },
          }}
          onClick={onClose}
        >
          <IoClose size={18} />
        </Button>
      </Box>
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
