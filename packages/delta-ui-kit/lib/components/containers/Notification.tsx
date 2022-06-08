import { jsx } from '@theme-ui/core';
import { forwardRef, useMemo } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { PortalledTransitionProps } from '../../hooks';
import { Button } from '../Button';
import { Box, BoxProps } from './Box';
export interface NotificationProps
  extends BoxProps,
    Partial<PortalledTransitionProps> {
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info';
}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      color = 'primary',
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
          error: IoIosCloseCircle,
          primary: BsCheckCircleFill,
          success: BsCheckCircleFill,
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
          backgroundColor: 'secondary',
          color: 'onSecondary',
          transform: `translateX(${
            isVisible ? '0, 0' : isEntering ? '3rem' : '3rem'
          })`,
          ...{
            error: { fontWeight: 500, fontSize: 1 },
            primary: { fontWeight: 600, fontSize: 2 },
            success: { fontWeight: 600, fontSize: 2 },
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
              size={18}
              sx={{
                color,
              }}
            />
          </Box>
          <Box sx={{ lineHeight: '24px', width: '296px' }}>{children}</Box>
        </Box>
      </Box>
    );
  }
);
