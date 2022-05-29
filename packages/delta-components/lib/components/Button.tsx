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
        type={type ?? 'button'}
        sx={{
          boxSizing: 'border-box',
          padding: 0,
          margin: 0,
          opacity: 1,
          border: 'none',
          background: 'none',
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
  const containedFocusVisible = {};
  return {
    borderRadius: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    fontWeight: 600,
    '&:focus-visible': {
      outline: '2px solid',
      outlineColor: 'primary',
      outlineOffset: 2,
    },
    ...{
      contained: {
        primary: {
          backgroundColor: 'primary',
          color: 'onPrimary',
          '&:not(:disabled):hover': { backgroundColor: 'accentPrimary' },
          ...containedFocusVisible,
        },
        secondary: {
          backgroundColor: 'secondary',
          color: 'onSecondary',
          '&:not(:disabled):hover': { backgroundColor: 'accentSecondary' },
          ...containedFocusVisible,
        },
        success: {
          backgroundColor: 'success',
          color: 'onSuccess',
          '&:not(:disabled):hover': { backgroundColor: 'accentSuccess' },
          ...containedFocusVisible,
        },
        error: {
          backgroundColor: 'error',
          color: 'onError',
          '&:not(:disabled):hover': { backgroundColor: 'accentError' },
          ...containedFocusVisible,
        },
      },
      outlined: {
        primary: {
          border: '1px solid',
          borderColor: 'primary',
          color: 'primary',
        },
        secondary: {
          border: '1px solid',
          borderColor: 'secondary',
          color: 'secondary',
        },
        success: {
          border: '1px solid',
          borderColor: 'success',
          color: 'success',
        },
        error: {
          border: '1px solid',
          borderColor: 'error',
          color: 'error',
        },
      },
      text: {
        primary: { paddingX: 1, borderRadius: 2, color: 'primary' },
        secondary: { paddingX: 1, borderRadius: 2, color: 'secondary' },
        success: { paddingX: 1, borderRadius: 2, color: 'success' },
        error: { paddingX: 1, borderRadius: 2, color: 'error' },
      },
    }[variant][color],
  };
};
