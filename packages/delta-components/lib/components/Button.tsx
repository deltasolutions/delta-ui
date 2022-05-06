import { jsx } from '@theme-ui/core';
import { ButtonHTMLAttributes, forwardRef } from 'react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  zoomable?: boolean;
  uppercase?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'success' | 'danger';
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      disabled,
      size = 'medium',
      color = 'primary',
      variant = 'contained',
      uppercase,
      zoomable,
      ...rest
    }: ButtonProps,
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        sx={{
          background: 'none',
          border: 'none',
          borderRadius: '500px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(uppercase && {
            textTransform: 'uppercase'
          }),
          ...(zoomable && {
            '&:hover, &:focus-visible': {
              transform: 'scale(1.06)'
            },
            '&:active': {
              transform: 'scale(1)'
            }
          }),
          ...{
            contained: {
              primary: {
                color: 'text_negative',
                backgroundColor: 'essenital_primary'
              },
              secondary: {
                color: 'text_base',
                backgroundColor: 'essential_secondary'
              },
              success: {
                color: 'text_negative',
                backgroundColor: 'essential_positive'
              },
              danger: {
                backgroundColor: 'essential_danger',
                color: 'text_negative'
              }
            },
            outlined: {
              primary: {
                color: 'text_base',
                borderColor: 'border_base',
                borderStyle: 'solid',
                '&:focus-visible, &:hover, &:active': {
                  borderColor: 'text_base'
                }
              },
              secondary: {
                color: 'text_base',
                borderColor: 'essential_secondary',
                borderStyle: 'solid'
              },
              success: {
                borderColor: 'essential_positive',
                borderStyle: 'solid',
                color: 'text_base'
              },
              danger: {
                borderColor: 'essential_danger',
                borderStyle: 'solid',
                color: 'text_base'
              }
            },
            text: {
              primary: {
                color: 'text_base'
              },
              secondary: {
                color: 'text_opposite_subdued'
              },
              success: {
                color: 'essential_positive'
              },
              danger: {
                color: 'essential_danger'
              }
            }
          }[variant][color],
          ...{
            small: {
              fontSize: '10px',
              padding: '10px 26px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              borderWidth: '1px'
            },
            medium: {
              fontSize: '12px',
              padding: '12px 34px',
              fontWeight: 600,
              borderWidth: '1px',
              letterSpacing: '1.5px'
            },
            large: {
              fontSize: '16px',
              padding: '15px 28px',
              fontWeight: 600,
              borderWidth: '1px',
              letterSpacing: '1px'
            }
          }[size],
          ...(disabled && {
            cursor: 'auto',
            transform: 'none !important',
            opacity: '0.5'
          })
        }}
        {...rest}
      />
    );
  }
);
