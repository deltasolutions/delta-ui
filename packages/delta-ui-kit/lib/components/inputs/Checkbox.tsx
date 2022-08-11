import { jsx } from '@theme-ui/core';
import { borderStyle } from 'polished';
import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
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
          verticalAlign: 'middle',
          userSelect: 'none',
          'input:focus-visible + div': {
            outline: '2px solid',
            outlineColor: 'primary',
            outlineOffset: 2,
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
        <Box
          className="checkmark"
          sx={{
            width: '22px',
            height: '22px',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {},
          }}
        >
          <FiCheck
            sx={{
              width: '1.2em',
              height: '1.2em',
              color: innerValue ? 'white' : 'transparent',
            }}
          />
        </Box>
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
