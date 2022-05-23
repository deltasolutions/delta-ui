import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';
export interface DropdownItemProps extends BoxProps {
  divide?: boolean;
}
export interface DropdownItemProps extends BoxProps {
  divide?: boolean;
  open?: boolean;
}
export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ divide, open, ...rest }: DropdownItemProps, ref) => {
    return (
      <Box
        sx={{
          ...(divide && { borderBottom: '1px rgba(255,255,255,.1) solid' })
        }}
      >
        <Box
          sx={{
            '& > a, button': {
              width: '100%',
              paddingX: '8px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              '&:hover, &:active, &:focus, &:focus-visible': {
                backgroundColor: 'rgba(255,255,255,.1)'
              },
              ...(open && { backgroundColor: 'rgba(255,255,255,.1)' }),
              color: 'text_base',
              fontWeight: 400
            }
          }}
          ref={ref}
          role="menu-item"
          {...rest}
        />
      </Box>
    );
  }
);
