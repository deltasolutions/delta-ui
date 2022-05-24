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
          opacity: 1,
          cursor: 'pointer',
          border: 'none',
          background: 'none',
          fontWeight: 600,
          borderWidth: 1,
          letterSpacing: 2,
          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
          ...(zoomable && {
            '&:not(:disabled)': {
              '&:hover, &:focus-visible': { transform: 'scale(1.05)' },
              '&:active': { transform: 'scale(1)' },
            },
          }),
          ...getSizeStyle(props),
          ...getVariantStyle(props),
        }}
        {...rest}
      />
    );
  }
);

const getSizeStyle = ({ size = 'medium' }: ButtonProps) => {
  return {
    small: {
      fontSize: 1,
      paddingX: '1.55em',
      paddingY: '0.65em',
    },
    medium: {
      fontSize: 2,
      paddingX: '1.85em',
      paddingY: '0.85em',
    },
    large: {
      fontSize: 3,
      paddingX: '2em',
      paddingY: '1em',
    },
  }[size];
};

const getVariantStyle = ({ variant, color = 'primary' }: ButtonProps) => {
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
        primary: {
          backgroundColor: 'primary',
          color: 'onPrimary',
          '&:not(:disabled):hover': { backgroundColor: 'accentPrimary' },
        },
        secondary: {
          backgroundColor: 'secondary',
          color: 'onSecondary',
          '&:not(:disabled):hover': { backgroundColor: 'accentSecondary' },
        },
        success: {
          backgroundColor: 'success',
          color: 'onSuccess',
          '&:not(:disabled):hover': { backgroundColor: 'accentSuccess' },
        },
        error: {
          backgroundColor: 'error',
          color: 'onError',
          '&:not(:disabled):hover': { backgroundColor: 'accentError' },
        },
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
        primary: { color: 'primary', paddingX: 0 },
        secondary: { color: 'secondary', paddingX: 0 },
        error: { color: 'error', paddingX: 0 },
      },
    }[variant][color],
  };
};
