import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { Button } from '../Button';
import { Box, BoxProps } from './Box';

export interface AlertProps extends BoxProps {
  color?: 'primary' | 'secondary' | 'success' | 'error';
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ color = 'primary', onClose, children, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          px: '0.625rem',
          py: 2,
          alignItems: 'center',
          display: 'flex',
          width: '100%',
          borderRadius: 4,
          ...{
            primary: {
              backgroundColor: 'primary',
              color: 'onPrimary',
            },
            secondary: {
              backgroundColor: 'secondary',
              color: 'onSecondary',
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
        <AiOutlineInfoCircle size={20} sx={{ my: '-0.25em', mr: 2 }} />
        <Box>{children}</Box>
        <Button
          sx={{
            p: '0.2em',
            ml: 'auto',
            mr: '-0.1em',
            my: '-0.2em',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: {
                primary: 'accentPrimary',
                secondary: 'accentSecondary',
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
