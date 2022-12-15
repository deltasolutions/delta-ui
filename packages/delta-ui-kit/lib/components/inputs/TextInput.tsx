import { jsx } from '@theme-ui/core';
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';
import { useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { Box } from '../containers';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<string | number | undefined> {
  variant?: 'pure';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
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
      startIcon,
      endIcon,
      type = 'text',
      ...rest
    }: TextInputProps,
    ref
  ) => {
    const [innerValue, setInnerValue] = useState<string | number | undefined>(
      value
    );
    const handleChange = (nextValue: string) => {
      nextValue !== innerValue && setInnerValue(nextValue);
      if (nextValue !== value) {
        onChange?.(
          type === 'number'
            ? nextValue && !isNaN(+nextValue)
              ? +nextValue
              : undefined
            : nextValue
        );
      }
    };
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value);
    }, [value]);
    return (
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            left: '0.3rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {startIcon}
        </Box>
        <input
          ref={ref}
          disabled={disabled}
          style={{
            ...(startIcon && { paddingLeft: '30px' }),
            ...(endIcon && { paddingRight: '30px' }),
          }}
          sx={{
            boxSizing: 'border-box',
            margin: 0,
            paddingX: 0,
            paddingY: 0,
            width: '100%',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontFamily: 'inherit',
            '&::-webkit-calendar-picker-indicator': {
              color: 'red',
            },
            ...(variant === 'pure'
              ? {}
              : {
                  opacity: disabled ? 0.5 : 1,
                  fontSize: 2,
                  borderRadius: 4,
                  letterSpacing: 'normal',
                  paddingX: '0.55em',
                  paddingY: '0.60em',
                  minWidth: '100px',
                  backgroundColor: 'accentContext',
                  color: 'onContext',
                  '&:focus': {
                    outline: '2px solid',
                    outlineColor: 'primary',
                  },
                  '&::placeholder': {
                    color: 'onContext',
                    opacity: 0.5,
                  },
                }),
          }}
          type={type}
          value={innerValue ?? ''}
          onBlur={() => onBlur?.()}
          onChange={e => handleChange(e.target.value)}
          onFocus={() => onFocus?.()}
          {...rest}
        />
        <Box
          sx={{
            position: 'absolute',
            right: '0.3rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {endIcon}
        </Box>
      </Box>
    );
  }
);
