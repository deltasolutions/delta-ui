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
  color?: 'primary' | 'secondary';
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      disabled,
      size = 'medium',
      variant = 'contained',
      color = 'primary',
      ...rest
    }: TextFieldProps,
    ref
  ) => {
    return (
      <input
        disabled={disabled}
        style={{ opacity: disabled ? DISABLED_OPACITY : 1 }}
        sx={{
          '&:focus': {
            outline: 'none'
          },
          border: 'none',
          borderRadius: 5,
          lineHeight: '1rem',
          letterSpacing: 'normal',
          ...{
            contained: {
              primary: {
                backgroundColor: '#333333',
                '&::placeholder': { color: 'cream' }
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
                  borderStyle: 'solid',
                  borderColor: 'border'
                }
              },
              secondary: {}
            }
          }[variant][color],
          ...{
            small: { fontSize: '12px', padding: '8px' },
            medium: { fontFize: '14p', padding: '12px' }
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
