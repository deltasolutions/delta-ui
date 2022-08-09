import { jsx } from '@theme-ui/core';
import { borderStyle } from 'polished';
import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { Box } from '../containers';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<boolean> {
  variant?: 'contained' | 'outlined';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      value,
      disabled,
      invalid, // TODO
      onChange,
      onFocus,
      onBlur,
      variant = 'contained',
      onKeyDown,
      children,
      ...rest
    }: CheckboxProps,
    ref
  ) => {
    const [innerValue, setInnerValue] = useState<boolean>(value ?? false);
    const handleChange = (nextValue: boolean) => {
      nextValue !== innerValue && setInnerValue(nextValue);
      nextValue !== value && onChange?.(nextValue);
    };
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value ?? false);
    }, [value]);

    return (
      <label
        style={{
          ...(disabled && { opacity: 0.5, cursor: 'auto' }),
        }}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 2,
          position: 'relative',
          verticalAlign: 'middle',
          userSelect: 'none',
          'input:focus-visible + span': {
            outline: '2px solid',
            outlineColor: 'primary',
            outlineOffset: 2,
          },
          'input:checked ~ .checkmark:after': {
            display: 'block',
          },
          ...getVariantStyle({ variant }),
        }}
      >
        <input
          ref={ref}
          checked={value as unknown as boolean}
          disabled={disabled}
          sx={{
            position: 'absolute',
            opacity: 0,
            cursor: 'pointer',
            height: '0',
            width: '0',
          }}
          type="checkbox"
          onBlur={() => onBlur?.()}
          onChange={ev => handleChange(ev.target.checked)}
          onFocus={() => onFocus?.()}
          onKeyDown={ev => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              handleChange(!innerValue);
            }
            onKeyDown?.(ev);
          }}
          {...rest}
        />
        <span
          className="checkmark"
          sx={{
            position: 'relative',
            top: '0',
            left: '0',
            borderRadius: 4,
            height: '22px',
            width: '22px',
            '&:after': {
              content: '""',
              position: 'absolute',
              display: 'none',
              left: '7px',
              top: '4px',
              width: '5px',
              height: '9px',
              borderColor: 'secondary',
              borderStyle: 'solid',
              borderWidth: '0 3px 3px 0',
              WebkitTransform: 'rotate(45deg)',
              msTransform: 'rotate(45deg)',
              transform: 'rotate(45deg)',
            },
          }}
        />
        {children && <Box>{children}</Box>}
      </label>
    );
  }
);
const getVariantStyle = ({ variant }) => {
  if (!variant) {
    return;
  }
  if (variant === 'outlined') {
    return {
      '.checkmark': {
        border: '1px solid',
        //TODO pick color from defaults/theme.ts
        borderColor: 'rgb(255 255 255 / 25%)',
        height: '20px',
        width: '20px',
        '&:hover': {
          borderColor: 'rgb(255 255 255 / 50%)',
        },
        '&:after': { left: '6px', top: '3px' },
      },
      'input:checked ~ .checkmark': {
        borderColor: 'primary',
        backgroundColor: 'primary',
      },
    };
  }
  return {
    '.checkmark': { backgroundColor: 'accentContext' },
    'input:checked ~ .checkmark': {
      backgroundColor: 'primary',
    },
  };
};
