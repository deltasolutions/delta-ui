import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  Fragment,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import { useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { Box } from '../containers';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<string> {
  variant?: 'pure';
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      variant,
      value,
      disabled,
      invalid, // TODO
      endAdornment,
      startAdornment,
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
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            left: '0.3rem',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          {startAdornment}
        </Box>
        <input
          ref={ref}
          disabled={disabled}
          style={{
            ...(startAdornment && { paddingLeft: '30px' }),
            ...(endAdornment && { paddingRight: '30px' }),
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
            ...(variant === 'pure'
              ? {}
              : {
                  opacity: disabled ? 0.5 : 1,
                  fontSize: 2,
                  border: 0,
                  borderRadius: 4,
                  letterSpacing: 'normal',
                  paddingX: '0.55em',
                  paddingY: '0.60em',
                  minWidth: '100px',
                  backgroundColor: 'accentSurface',
                  color: 'onSurface',
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
        <Box
          sx={{
            position: 'absolute',
            right: '0.3rem',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          {endAdornment}
        </Box>
      </Box>
    );
  }
);
