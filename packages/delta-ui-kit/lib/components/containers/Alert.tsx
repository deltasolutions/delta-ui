import { keyframes } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { Button } from '../Button';
import { Box, BoxProps } from './Box';

export interface AlertProps extends BoxProps {
  onClose?: () => void;
  color?: 'success' | 'error' | 'warning';
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
          width: '100%',
          animation: `${slideIn} 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)`,
          ...{
            success: {
              backgroundColor: 'info',
              color: 'onInfo',
            },
            error: {
              backgroundColor: 'error',
              color: 'onError',
            },
            warning: {
              backgroundColor: 'warning',
              color: 'onWarning',
            },
          }[color],
        }}
        {...rest}
      >
        <span
          sx={{
            overflow: 'hidden',
            wordBreak: 'break-word',
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
            mt: '6px',
            ml: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 1,
            minWidth: 1,
            borderRadius: '100%',
            '&:hover, &:focus-visible': {
              backgroundColor: {
                success: 'accentInfo',
                warning: 'accentWarning',
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
