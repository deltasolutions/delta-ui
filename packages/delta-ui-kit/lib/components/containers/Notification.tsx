import { jsx } from '@theme-ui/core';
import { forwardRef, useMemo } from 'react';
import { MdInfo, MdWarning } from 'react-icons/md';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri';
import { PortalledTransitionProps } from '../../hooks';
import { Box, BoxProps } from './Box';

export interface NotificationProps
  extends BoxProps,
    Partial<PortalledTransitionProps> {
  color?: 'info' | 'success' | 'warning' | 'error';
}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      color = 'info',
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
          info: MdInfo,
          success: RiCheckboxCircleFill,
          warning: MdWarning,
          error: RiCloseCircleFill,
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
          opacity: isVisible ? 1 : 0,
          backgroundColor: 'contrast',
          color: 'onContrast',
          fontWeight: 600,
          fontSize: 2,
          transform: `translateX(${
            isVisible ? '0, 0' : isEntering ? '3rem' : '3rem'
          })`,
          transition: [
            'opacity 0.2s linear',
            'transform 0.2s linear',
            'top 0.2s ease-out',
            'bottom 0.2s ease-out',
          ].join(', '),
        }}
        {...rest}
      >
        <Box sx={{ width: '330px', display: 'flex', gap: 2 }}>
          <Icon
            sx={{
              flex: '0 0 auto',
              width: '1.5rem',
              height: '1.5rem',
              verticalAlign: 'middle',
              color,
            }}
          />
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
