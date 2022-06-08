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
const slideIn = keyframes({
  from: {
    transform: 'scale(0.85)',
  },
  to: {
    transform: 'scale(1)',
  },
});
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ color = 'primary', onClose, children, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          borderRadius: 4,
          paddingX: '10px',
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
        {/* <Button
          sx={{
            mt: 2,
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 1,
            minWidth: 1,
          }}
          tabIndex={-1}
        >
          <AiOutlineInfoCircle size={16} />
        </Button> */}
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
      // <Box
      //   ref={ref}
      //   sx={{
      //     alignItems: 'flex-start',
      //     wordWrap: 'break-word',
      //     display: 'flex',
      //     width: '100%',
      //     py: 1,
      //     borderRadius: 4,
      //     ...{
      //       info: {
      //         backgroundColor: 'info',
      //         color: 'onInfo',
      //       },
      //       warning: {
      //         backgroundColor: 'warning',
      //         color: 'onWarning',
      //       },
      //       success: {
      //         backgroundColor: 'success',
      //         color: 'onSuccess',
      //       },
      //       error: {
      //         backgroundColor: 'error',
      //         color: 'onError',
      //       },
      //     }[color],
      //   }}
      //   {...rest}
      // >
      //   <AiOutlineInfoCircle
      //     sx={{
      //       flex: '0 0 auto',
      //       width: '1.2rem',
      //       height: '1.2rem',
      //       verticalAlign: 'middle',
      //       ml: '0.2rem',
      //       mt: '0.1rem',
      //       mr: '0.3rem',
      //     }}
      //   />
      //   <Box sx={{ mr: '0.2rem' }}>{children}</Box>
      //   <Button
      //     sx={{
      //       mr: '0.2em',
      //       mt: '0.1em',
      //       ml: 'auto',
      //       borderRadius: '50%',
      //       '&:hover': {
      //         backgroundColor: {
      //           info: 'accentInfo',
      //           warning: 'accentWarning',
      //           success: 'accentSuccess',
      //           error: 'accentError',
      //         }[color],
      //       },
      //     }}
      //     onClick={onClose}
      //   >
      //     <IoClose size={18} sx={{ verticalAlign: 'middle' }} />
      //   </Button>
      // </Box>
    );
  }
);
