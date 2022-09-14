import { jsx } from '@theme-ui/core';
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';
import { useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { Box } from '../containers';

export interface ColorPickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<string> {
  variant?: 'pure';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
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
      ...rest
    }: ColorPickerProps,
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
      <Box
        sx={{
          position: 'relative',
          'input[type="color"]': {
            WebkitAppearance: 'none',
          },
          'input[type="color"]::-webkit-color-swatch-wrapper': {
            padding: '0',
          },
          'input[type="color"]::-webkit-color-swatch': { border: 'none' },
        }}
      >
        <input
          ref={ref}
          disabled={disabled}
          sx={{ border: 'none' }}
          type="color"
          value={innerValue}
          onBlur={() => onBlur?.()}
          onChange={e => handleChange(e.target.value)}
          onFocus={() => onFocus?.()}
          {...rest}
        />
      </Box>
    );
  }
);
