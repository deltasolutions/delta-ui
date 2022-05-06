import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { MdAdd } from 'react-icons/md';
import { TiDelete, TiPlus } from 'react-icons/ti';
import { AsButton } from './AsButton';
import { Box, BoxProps } from './Box';
import { EllipsisText } from './EllipsisText';
import { Icon } from './Icon';

export interface ChipProps extends BoxProps {
  variant?: 'filled' | 'outlined' | 'dashed';
  size?: 'small' | 'medium';
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'success';
  onDelete?: () => {};
  onAdd?: () => {};
}
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
              default: { backgroundColor: 'background_elevated_highlight' },
              primary: { backgroundColor: '' },
              secondary: { backgroundColor: '' },
              errror: { backgroundColor: '' },
              success: { backgroundColor: '' }
            },
            outlined: {
              default: { backgroundColor: '' },
              primary: { backgroundColor: '' },
              secondary: { backgroundColor: '' },
              errror: { backgroundColor: '' },
              success: { backgroundColor: '' }
            },
            dashed: {
              default: { backgroundColor: '' },
              primary: { backgroundColor: '' },
              secondary: { backgroundColor: '' },
              errror: { backgroundColor: '' },
              success: { backgroundColor: '' }
            }
          }[variant][color],
          ...{
            small: { padding: '8px 10px', fontSize: '12px' },
            medium: { padding: '10px 10px', fontSize: '14px' }
          }[size]
        }}
        {...rest}
      >
        <EllipsisText sx={{ paddingX: size === 'small' ? '3px' : '3px' }}>
          {children}
        </EllipsisText>
        {onDelete && (
          <AsButton onClick={onDelete}>
            <Icon
              size={size === 'small' ? 'very-small' : 'small'}
              icon={TiDelete}
            />
          </AsButton>
        )}
        {onAdd && (
          <AsButton onClick={onAdd}>
            <Icon
              size={size === 'small' ? 'very-small' : 'small'}
              icon={MdAdd}
            />
          </AsButton>
        )}
      </Box>
    );
  }
);
