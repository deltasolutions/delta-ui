import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';

export interface TextInputProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      keyof FormWidgetProps | 'size'
    >,
    FormWidgetProps<string> {
  variant?: 'pure';
  size?: 'small' | 'medium';
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      variant,
      value,
      disabled,
      invalid, // TODO
      onChange,
      onFocus,
      onBlur,
      size,
      ...rest
    }: TextInputProps,
    ref
  ) => {
    const [innerValue, setInnerValue] = useState<string>(value ?? '');
    const handleChange = (nextValue: string) => {
      nextValue !== innerValue && setInnerValue(nextValue);
      nextValue !== value && onChange?.(nextValue);
    };
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value ?? '');
    }, [value]);
    return (
      <input
        ref={ref}
        disabled={disabled}
        sx={{
          boxSizing: 'border-box',
          margin: 0,
          paddingX: 0,
          paddingY: 0,
          width: '100%',

          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          ...(variant === 'pure'
            ? {}
            : size === 'medium'
            ? {
                opacity: disabled ? 0.5 : 1,
                fontSize: 2,
                border: 0,
                borderRadius: 4,
                letterSpacing: 'normal',
                paddingX: '0.55em',
                minWidth: '100px',
                paddingY: '0.60em',
                backgroundColor: 'accentSurface',
                color: 'onSurface',
                '&:focus': {
                  outline: '2px solid',
                  outlineColor: 'primary',
                },
              }
            : {
                fontSize: 1,
                opacity: disabled ? 0.5 : 1,
                borderRadius: 4,
                letterSpacing: 'normal',
                border: 0,
                backgroundColor: 'accentSurface',
                color: 'onSurface',
                paddingX: '0.4em',
                paddingY: '0.5em',
                '&:focus': {
                  outline: '2px solid',
                  outlineColor: 'primary',
                },
              }),
        }}
        type="text"
        value={innerValue}
        onBlur={() => onBlur?.()}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => onFocus?.()}
        {...rest}
      />
    );
  }
);
