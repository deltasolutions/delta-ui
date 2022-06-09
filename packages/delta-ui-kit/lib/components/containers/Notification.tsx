import { jsx } from '@theme-ui/core';
import { forwardRef, useMemo } from 'react';
import {
  RiCloseCircleFill,
  RiErrorWarningLine,
  RiCheckboxCircleFill,
} from 'react-icons/ri';
import { PortalledTransitionProps } from '../../hooks';
import { Box, BoxProps } from './Box';

export interface NotificationProps
  extends BoxProps,
    Partial<PortalledTransitionProps> {
  color?: 'success' | 'error' | 'warning';
}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      color = 'success',
      children,
      context,
      handleClose,
      isVisible,
      isEntering,
      ...rest
    },
    ref
  ) => {
    const Icon = useMemo(
      () =>
        ({
          success: RiCheckboxCircleFill,
          error: RiCloseCircleFill,
          warning: RiErrorWarningLine,
        }[color]),
      [color]
    );
    return (
      <Box
        ref={ref}
        sx={{
          m: 2,
          p: 3,
          borderRadius: 4,
          display: 'flex',
          border: '1px grey solid',
          opacity: isVisible ? 1 : 0,
          backgroundColor: 'contrast',
          color: 'onContrast',
          transform: `translateX(${
            isVisible ? '0, 0' : isEntering ? '3rem' : '3rem'
          })`,
          ...{
            success: { fontWeight: 600, fontSize: 2 },
            error: { fontWeight: 500, fontSize: 1 },
            warning: { fontWeight: 600, fontSize: 2 },
          }[color],
          transition: ['opacity 0.2s linear', 'transform 0.2s linear'].join(
            ', '
          ),
        }}
        {...rest}
      >
        <Box sx={{ width: '326px', display: 'flex', gap: 3 }}>
          <Box
            sx={{
              mt: 1,
            }}
          >
            <Icon
              size={21}
              sx={{
                color,
              }}
            />
          </Box>
          <Box
            sx={{ lineHeight: '24px', width: '296px', wordBreak: 'break-word' }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    );
  }
);
