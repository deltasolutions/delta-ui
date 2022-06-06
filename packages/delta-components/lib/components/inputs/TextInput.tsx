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
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<string> {
  variant?: 'pure';
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
          fontSize: 2,
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
        value={innerValue}
        disabled={disabled}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => onFocus?.()}
        onBlur={() => onBlur?.()}
        {...rest}
      />
    );
  }
);
