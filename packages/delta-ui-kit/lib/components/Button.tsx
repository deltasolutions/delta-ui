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
    const { variant, color, size, zoomable, disabled, type, ...rest } = props;
    return (
      <button
        ref={ref}
        disabled={disabled}
        sx={{
          boxSizing: 'border-box',
          padding: 0,
          margin: 0,
          opacity: 1,
          border: 'none',
          background: 'none',
          color: 'inherit',
          fontSize: 'inherit',
          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary',
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
        type={type ?? 'button'}
        {...rest}
      />
    );
  }
);

const getSizeStyle = ({ variant, size = 'medium' }: ButtonProps) => {
  if (!variant) {
    return {};
  }
  return {
    small: {
      fontSize: 1,
      paddingX: '1.4em',
      paddingY: '0.6em',
    },
    medium: {
      fontSize: 1,
      paddingX: '1.85em',
      paddingY: '0.85em',
    },
    large: {
      fontSize: 2,
      paddingX: '2em',
      paddingY: '1em',
    },
  }[size];
};

const getVariantStyle = ({ variant, color = 'primary' }: ButtonProps): any => {
  if (!variant) {
    return {
      display: 'flex',
      alignItems: 'center',
    };
  }
  return {
    borderRadius: '500px',
    display: 'inline-block',
    textAlign: 'center',
    outlineOffset: '2px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: 600,
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
          border: '2px solid',
          borderColor: 'primary',
          color: 'primary',
        },
        secondary: {
          border: '2px solid',
          borderColor: 'secondary',
          color: 'secondary',
        },
        success: {
          border: '2px solid',
          borderColor: 'success',
          color: 'success',
        },
        error: {
          border: '2px solid',
          borderColor: 'error',
          color: 'error',
        },
      },
      text: {
        primary: {
          paddingX: 1,
          borderRadius: 2,
          color: 'primary',
          '&:not(:disabled):hover': { color: 'accentPrimary' },
        },
        secondary: {
          paddingX: 1,
          borderRadius: 2,
          color: 'secondary',
          '&:not(:disabled):hover': { color: 'accentSecondary' },
        },
        success: {
          paddingX: 1,
          borderRadius: 2,
          color: 'success',
          '&:not(:disabled):hover': { color: 'accentSuccess' },
        },
        error: {
          paddingX: 1,
          borderRadius: 2,
          color: 'error',
          '&:not(:disabled):hover': { color: 'accentError' },
        },
      },
    }[variant][color],
  };
};
