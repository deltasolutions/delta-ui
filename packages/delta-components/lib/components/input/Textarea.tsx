import { jsx } from '@theme-ui/core';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { DISABLED_OPACITY } from '../../variables';
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined';
  color?: 'primary';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      disabled,
      size = 'medium',
      variant = 'contained',
      color = 'primary',
      ...rest
    }: TextareaProps,
    ref
  ) => {
    return (
      <textarea
        ref={ref}
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
        {...rest}
      />
    );
  }
);
