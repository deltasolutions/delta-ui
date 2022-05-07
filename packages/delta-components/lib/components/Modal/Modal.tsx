import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { MODAL_PADDING, ICON_MEDIUM_SIZE } from '../../variables';
import { Box, BoxProps } from '../Box';
import { Button } from '../Button';
export interface ModalProps extends BoxProps {
  size?: 'small' | 'medium' | 'large' | 'page';
  close: () => void;
}
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, size = 'medium', close, ...rest }, ref) => {
    return (
      <Box
        sx={{
          backgroundColor: 'surfaceVariant',
          display: 'flex',
          width: '100%',
          position: 'relative',
          flexDirection: 'column',
          borderRadius: 3
        }}
        ref={ref}
        {...rest}
      >
        <Button
          onClick={close}
          sx={{
            position: 'absolute',
            right: 5,
            top: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '500px',
            width: 2,
            p: 1,
            height: 2,
            backgroundColor: 'tertiaryContainer'
          }}
        >
          <IoCloseOutline sx={{ width: '100%', height: '100%' }} />
        </Button>
        <Box
          sx={{
            overflowY: 'scroll',
            ...{
              small: { width: '550px', height: '40vh' },
              medium: { width: '650px', height: '65vh' },
              large: { width: '750px', height: '80vh' }
            }[size],
            '& > div:last-child': { marginTop: 'auto' }
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }
);
