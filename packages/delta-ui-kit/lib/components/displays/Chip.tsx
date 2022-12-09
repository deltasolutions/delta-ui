import { jsx } from '@theme-ui/core';
import { forwardRef, HtmlHTMLAttributes } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { Button } from '../Button';
import { Box } from '../containers';

export interface ChipProps extends HtmlHTMLAttributes<HTMLDivElement> {
  variant?: 'contained' | 'outlined';
  onDelete?: (id: ChipProps['id']) => void;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ onDelete, children, id, variant = 'contained', ...rest }, ref) => {
    const variantStyle = useVariantStyle(variant);
    return (
      <Box ref={ref} id={id} sx={variantStyle} {...rest}>
        <Box role="contentinfo">{children}</Box>
        {onDelete && (
          <Button role="button" onClick={() => onDelete(id)}>
            <IoMdCloseCircle size={16} />
          </Button>
        )}
      </Box>
    );
  }
);

const useVariantStyle = (variant: ChipProps['variant']) => {
  if (!variant) {
    return {};
  }
  const boxStyle = {
    px: 2,
    py: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    borderRadius: 5,
  };
  const contentStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  };
  return {
    contained: {
      ...boxStyle,
      backgroundColor: 'secondary',
      color: 'onSecondary',
      '& > div[role=contentinfo]': contentStyle,
      '& > button[role=button]': buttonStyle,
    },
    outlined: {
      ...boxStyle,
      backgroundColor: 'transparent',
      border: '1px solid',
      borderColor: 'border',
      '& > div[role=contentinfo]': {
        ...contentStyle,
        color: 'onContext',
      },
      '& > button[role=button]': {
        ...buttonStyle,
        '&:hover, &:active, &:focus-visible': {
          color: 'accentOnContext',
        },
      },
    },
  }[variant];
};
