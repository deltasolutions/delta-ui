import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { MODAL_PADDING, ICON_MEDIUM_SIZE } from '../../variables';
import { AsButton } from '../AsButton';
import { Box, BoxProps } from '../Box';
export interface ModalProps extends BoxProps {
  size?: 'small' | 'medium' | 'large' | 'page';
  close: () => void;
}
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, size = 'medium', close, ...rest }, ref) => {
    return (
      <Box
        sx={{
          backgroundColor: 'decorative_subdued',
          display: 'flex',
          ...{
            small: { maxWidth: '550px' },
            medium: { maxWidth: '650px' },
            large: { maxWidth: '750px' },
            page: {
              maxWidth: '100%',
              height: '100vh',
              '& > div:last-child': { marginTop: 'auto' }
            }
          }[size],
          width: '100%',
          maxHeight: '100%',
          overflow: 'auto',
          position: 'relative',
          // borderWidth: '0.1px',
          // borderStyle: 'solid',
          // borderColor: 'border_base',
          flexDirection: 'column',
          borderRadius: 4
        }}
        ref={ref}
        {...rest}
      >
        <AsButton
          onClick={close}
          sx={{
            position: 'absolute',
            right: `${MODAL_PADDING}px`,
            top: `${MODAL_PADDING}px`
          }}
        >
          <IoCloseOutline size={ICON_MEDIUM_SIZE} />
        </AsButton>
        {children}
      </Box>
    );
  }
);
