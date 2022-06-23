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
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
    px: 2,
    py: 2,
    gap: 2,
  };
  const contentStyle = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };
  const buttonStyle = {
    display: 'flex',
    borderRadius: 5,
    alignItems: 'center',
  };
  return {
    contained: {
      ...boxStyle,
      backgroundColor: 'onContrast',
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
