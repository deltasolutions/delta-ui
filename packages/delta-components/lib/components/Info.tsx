import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Box, BoxProps } from './Box';
export interface InfoProps extends BoxProps {
  severity?: 'info' | 'error' | 'success' | 'warning';
}
export const Info = forwardRef<HTMLDivElement, InfoProps>(
  ({ children, severity = 'info', ...rest }, ref) => {
    return (
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
          borderRadius: 5,
          paddingX: 4,
          backgroundColor: severity,
          '& > *': {
            color: {
              info: 'onInfo',
              warning: 'onWarning',
              error: 'onError',
              success: 'onSuccess'
            }[severity]
          }
        }}
        ref={ref}
        {...rest}
      >
        <Box
          sx={{
            paddingY: 3,
            display: 'flex',
            alignItems: 'flex-start',
            minWidth: 1,
            minHeight: 1
          }}
        >
          <AiOutlineInfoCircle sx={{ width: '100%', height: '100%' }} />
        </Box>
        <span
          sx={{
            fontSize: 1,
            paddingY: 3,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 400
          }}
        >
          {children}
        </span>
      </Box>
    );
  }
);
