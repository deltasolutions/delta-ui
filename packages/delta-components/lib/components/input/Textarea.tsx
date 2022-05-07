import { jsx } from '@theme-ui/core';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { DISABLED_OPACITY } from '../../variables';
export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'small' | 'medium';
  variant?: 'contained' | 'outlined';
  color?: 'tertiary';
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      disabled,
      size = 'medium',
      variant = 'contained',
      color = 'tertiary',
      ...rest
    }: TextAreaProps,
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        style={{ opacity: disabled ? DISABLED_OPACITY : 1 }}
        sx={{
          border: 'none',
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
                  borderStyle: 'solid',
                  borderColor: 'border'
                }
              },
              secondary: {}
            }
          }[variant][color],
          ...{
            small: { fontSize: 0, padding: 3 },
            medium: { fontFize: 1, padding: 4 }
          }[size],
          color: 'text_base'
        }}
        {...rest}
      />
    );
  }
);
