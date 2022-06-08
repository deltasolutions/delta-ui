import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { PortalledTransitionProps } from '../../hooks';
import { Button } from '../Button';
import { Box, BoxProps } from './Box';
export interface NotificationProps
  extends BoxProps,
    Partial<PortalledTransitionProps> {
  color?: 'primary' | 'secondary' | 'success' | 'error';
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
    return (
      <Box
        ref={ref}
        sx={{
          m: 3,
          p: 3,
          width: '350px',
          minHeight: '50px',
          borderRadius: 4,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1,
          alignItems: 'flex-start',
          boxShadow: 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: 'secondary',
          color: 'onSecondary',
          borderLeftColor: color,
          borderLeftWidth: '5',
          borderLeftStyle: 'solid',
          transform: `translateX(${
            isVisible ? '0' : isEntering ? 'rem' : '-0.5rem'
          })`,
          ...{
            error: { fontWeight: 400, fontSize: 1 },
            primary: { fontWeight: 500, fontSize: 2 },
            success: { fontWeight: 600, fontSize: 2 },
          }[color],
          transition: [
            'opacity 0.2s linear',
            'transform 0.2s linear',
            'right 0.3s ease-out',
            'left 0.3s ease-out',
          ].join(', '),
        }}
        {...rest}
      >
        {
          {
            error: <IoMdCloseCircle />,
            primary: <BsCheckCircleFill />,
            success: <BsCheckCircleFill />,
          }[color]
        }
        {children}
        {/* <Button
          sx={{
            aspectRatio: '1 / 1',
            p: '0.2em',
            ml: 'auto',
            mr: '-0.2em',
            my: '-0.2em',
            borderRadius: '50%',
            '&:hover, &:focus, &:focus-visible': {
              backgroundColor: 'accentSecondary',
            },
          }}
          onClick={handleClose}
        >
          <IoClose size={15} sx={{ verticalAlign: 'middle' }} />
        </Button> */}
      </Box>
    );
  }
);
