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
          borderRadius: 5,
          paddingX: '10px',
          ...{
            info: { backgroundColor: 'essential_announcement' },
            error: {
              backgroundColor: 'essential_danger',
              span: { color: 'black' }
            },
            success: { backgroundColor: 'essential_positive' },
            warning: {
              backgroundColor: 'essential_warning',
              span: { color: 'black' }
            }
          }[severity]
        }}
        ref={ref}
        {...rest}
      >
        <Box
          sx={{ paddingY: '8px', display: 'flex', alignItems: 'flex-start' }}
        >
          <AiOutlineInfoCircle
            size={16}
            sx={{
              '& > *': {
                ...{
                  info: { color: 'text_base' },
                  error: {
                    color: 'black'
                  },
                  success: {},
                  warning: {
                    color: 'black'
                  }
                }[severity]
              }
            }}
          />
        </Box>
        <span
          sx={{
            color: 'text_base',
            fontSize: '13px',
            paddingY: '8px',
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
