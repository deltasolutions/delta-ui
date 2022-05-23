import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { MdAdd } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { Box, BoxProps } from './Box';
import { Button } from './Button';
import { EllipsisText } from './EllipsisText';
import { Icon } from './Icon';

export interface ChipProps extends BoxProps {
  variant?: 'filled' | 'outlined' | 'dashed';
  size?: 'small' | 'medium';
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'success';
  onDelete?: () => {};
  onAdd?: () => {};
}

// TODO: Finish component.
export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      children,
      variant = 'filled',
      color = 'default',
      size = 'medium',
      onDelete,
      onAdd,
      ...rest
    }: ChipProps,
    ref
  ) => {
    return (
      <Box
        ref={ref}
        sx={{
          borderRadius: '100px',
          position: 'relative',
          height: '40px',
          display: 'flex',
          gap: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          ...{
            filled: {
              primary: { backgroundColor: '' },
              secondary: { backgroundColor: '' },
              error: { backgroundColor: '' },
              success: { backgroundColor: '' },
            },
            outlined: {
              primary: { backgroundColor: '' },
              secondary: { backgroundColor: '' },
              error: { backgroundColor: '' },
              success: { backgroundColor: '' },
            },
            dashed: {
              primary: { backgroundColor: '' },
              secondary: { backgroundColor: '' },
              error: { backgroundColor: '' },
              success: { backgroundColor: '' },
            },
          }[variant][color],
          ...{
            small: { padding: '8px 10px', fontSize: '12px' },
            medium: { padding: '10px 10px', fontSize: '14px' },
          }[size],
        }}
        {...rest}
      >
        <EllipsisText sx={{ paddingX: size === 'small' ? '3px' : '3px' }}>
          {children}
        </EllipsisText>
        {onDelete && (
          <Button onClick={onDelete}>
            <Icon
              size={size === 'small' ? 'very-small' : 'small'}
              icon={TiDelete}
            />
          </Button>
        )}
        {onAdd && (
          <Button onClick={onAdd}>
            <Icon
              size={size === 'small' ? 'very-small' : 'small'}
              icon={MdAdd}
            />
          </Button>
        )}
      </Box>
    );
  }
);
