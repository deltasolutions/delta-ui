import { jsx } from '@theme-ui/core';
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useCallback
} from 'react';
import { DISABLED_OPACITY } from '../../variables';
export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'small' | 'medium';
  variant?: 'contained' | 'outlined';
  color?: 'tertiary' | 'secondary';
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      disabled,
      size = 'medium',
      variant = 'contained',
      color = 'tertiary',
      ...rest
    }: TextFieldProps,
    ref
  ) => {
    return (
      <input
        disabled={disabled}
        sx={{
          opacity: disabled ? 1 : 2,
          border: 0,
          borderRadius: 5,
          lineHeight: '1rem',
          letterSpacing: 'normal',
          ...{
            contained: {
              tertiary: {
                backgroundColor: 'tertiary',
                color: 'onTertiaryAccent',
                '&::placeholder': { color: 'onTertiary' }
              },
              secondary: {
                backgroundColor: 'white',
                color: 'black',
                '&::placeholder': { color: 'grey' }
              }
            },
            outlined: {
              primary: {
                backgroundColor: 'transparentAccent',
                border: '1px transparent solid',
                '&::placeholder': { color: 'cream' },
                '&:focus': {
                  backgroundColor: 'transparent',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }
              },
              secondary: {}
            }
          }[variant][color],
          ...{
            small: { fontSize: 0, height: 2, paddingX: 3 },
            medium: { fontFize: 1, height: 3, paddingX: 4 }
          }[size],
          color: 'text_base'
        }}
        ref={ref}
        type="text"
        {...rest}
      />
    );
  }
);
