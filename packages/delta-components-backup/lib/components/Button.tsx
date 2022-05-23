import { jsx } from '@theme-ui/core';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  size?: 'small' | 'medium' | 'large';
  zoomable?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const { variant, color, size, zoomable, disabled, ...rest } = props;
    return (
      <button
        ref={ref}
        disabled={disabled}
        sx={{
          padding: 0,
          margin: 0,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          border: 'none',
          background: 'none',
          ...(zoomable && {
            '&:hover, &:focus-visible': { transform: 'scale(1.05)' },
            '&:active': { transform: 'scale(1)' },
          }),
          ...(disabled && {
            cursor: 'auto',
            transform: 'none',
            opacity: 1,
          }),
          ...getVariantStyle(props),
        }}
        {...rest}
      />
    );
  }
);

const getVariantStyle = ({
  variant,
  color = 'primary',
  size = 'medium',
}: ButtonProps) => {
  if (!variant) {
    return {};
  }
  return {
    borderRadius: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    ...{
      contained: {
        primary: { backgroundColor: 'primary', color: 'onPrimary' },
        secondary: { backgroundColor: 'secondary', color: 'onSecondary' },
        success: { backgroundColor: 'success', color: 'onSuccess' },
        error: { backgroundColor: 'error', color: 'onError' },
      },
      outlined: {
        primary: {
          border: '1px solid',
          borderColor: 'primary',
          color: 'onPrimary',
        },
        secondary: {
          border: '1px solid',
          borderColor: 'secondaryContainer',
          color: 'secondary',
        },
        error: {
          border: '1px solid',
          borderColor: 'error',
          color: 'error',
        },
      },
      text: {
        primary: { color: 'primary' },
        secondary: { color: 'secondary' },
        error: { color: 'error' },
      },
    }[variant][color],
    ...{
      small: {
        fontSize: 0,
        paddingY: 4,
        paddingX: 6,
        fontWeight: 600,
        letterSpacing: 2,
        borderWidth: 1,
      },
      medium: {
        fontSize: 1,
        paddingY: 4,
        paddingX: 7,
        fontWeight: 600,
        borderWidth: 1,
        letterSpacing: 2,
      },
      large: {
        fontSize: 2,
        paddingY: 4,
        paddingX: 8,
        fontWeight: 600,
        borderWidth: 1,
        letterSpacing: 2,
      },
    }[size],
  };
};
