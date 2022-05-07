import { jsx } from '@theme-ui/core';
import { ButtonHTMLAttributes, forwardRef } from 'react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  zoomable?: boolean;
  uppercase?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'error';
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      disabled,
      size = 'medium',
      color = 'primary',
      variant,
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
          opacity: disabled ? 1 : 2,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          margin: 0,
          ...(variant && {
            borderRadius: '500px',
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
                  color: 'onPrimary',
                  backgroundColor: 'primary'
                },
                secondary: {
                  color: 'onSecondary',
                  backgroundColor: 'secondary'
                },
                error: {
                  backgroundColor: 'error',
                  color: 'onError'
                }
              },
              outlined: {
                primary: {
                  color: 'onPrimary',
                  borderColor: 'primary',
                  borderStyle: 'solid'
                },
                secondary: {
                  color: 'secondary',
                  borderColor: 'secondaryContainer',
                  borderStyle: 'solid',
                  '&:focus-visible, &:hover, &:active': {
                    borderColor: 'secondary'
                  }
                },
                error: {
                  borderColor: 'essential_danger',
                  borderStyle: 'solid',
                  color: 'text_base'
                }
              },
              text: {
                primary: {
                  color: 'primary'
                },
                secondary: {
                  color: 'secondary'
                },
                error: {
                  color: 'error'
                }
              }
            }[variant][color],
            ...{
              small: {
                fontSize: 0,
                paddingY: 4,
                paddingX: 6,
                fontWeight: 600,
                letterSpacing: 2,
                borderWidth: 1
              },
              medium: {
                fontSize: 1,
                paddingY: 4,
                paddingX: 7,
                fontWeight: 600,
                borderWidth: 1,
                letterSpacing: 2
              },
              large: {
                fontSize: 2,
                paddingY: 4,
                paddingX: 8,
                fontWeight: 600,
                borderWidth: 1,
                letterSpacing: 2
              }
            }[size],
            ...(disabled && {
              cursor: 'auto',
              transform: 'none !important',
              opacity: 1
            })
          })
        }}
        {...rest}
      />
    );
  }
);
