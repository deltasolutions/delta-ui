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
          alignItems: 'flex-start',
          wordWrap: 'break-word',
          display: 'flex',
          width: '100%',
          py: 1,
          borderRadius: 4,
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
        <AiOutlineInfoCircle
          sx={{
            flex: '0 0 auto',
            width: '1.2rem',
            height: '1.2rem',
            verticalAlign: 'middle',
            ml: '0.2rem',
            mt: '0.1rem',
            mr: '0.3rem',
          }}
        />
        <Box sx={{ mr: '0.2rem' }}>{children}</Box>
        <Button
          sx={{
            mr: '0.2em',
            mt: '0.1em',
            ml: 'auto',
            borderRadius: '50%',
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
          <IoClose size={18} sx={{ verticalAlign: 'middle' }} />
        </Button>
      </Box>
    );
  }
);
