import { jsx } from '@theme-ui/core';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'pure';
  size?: 'medium';
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props: TextFieldProps, ref) => {
    const { variant, size = 'medium', disabled, ...rest } = props;
    return (
      <input
        sx={{
          boxSizing: 'border-box',
          margin: 0,
          paddingX: 0,
          paddingY: 0,
          width: '100%',
          minWidth: '100px',
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          fontSize: 3,
          ...(variant === 'pure'
            ? {}
            : {
                opacity: disabled ? 0.5 : 1,
                border: 0,
                borderRadius: 4,
                letterSpacing: 'normal',
                paddingX: '0.55em',
                paddingY: '0.60em',
                backgroundColor: 'accentSurface',
                color: 'onSurface',
                '&:focus': {
                  outline: '2px solid',
                  outlineColor: 'primary',
                },
              }),
        }}
        ref={ref}
        type="text"
        disabled={disabled}
        {...rest}
      />
    );
  }
);
