import { jsx } from '@theme-ui/core';
import { forwardRef, InputHTMLAttributes, useCallback, useState } from 'react';
import { useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { Box } from '../containers';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<boolean> {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      value,
      disabled,
      invalid, // TODO
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      children,
      ...rest
    }: SwitchProps,
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <label
          sx={{
            opacity: disabled ? 0.5 : 11,
            display: 'inline-block',
            height: '22px',
            position: 'relative',
            verticalAlign: 'middle',
            userSelect: 'none',
            'input:checked + span': {
              backgroundColor: 'primary',
            },
            'input:checked + span:before': {
              transform: 'translateX(18px)',
            },
            'input:focus-visible + span': {
              outline: '2px solid',
              outlineColor: 'primary',
              outlineOffset: 2,
            },
            'input:not(:disabled) + span': {
              cursor: 'default',
              opacity: 2,
            },
            'input:disabled + span:before': {
              background: 'onSurface',
            },
            'input:disabled + span': {
              opacity: 1,
            },
          }}
        >
          <input
            ref={ref}
            type="checkbox"
            sx={{
              position: 'absolute',
              opacity: 0,
              cursor: 'default',
              height: '0',
              width: '0',
            }}
            checked={innerValue}
            disabled={disabled}
            onChange={ev => handleChange(ev.target.checked)}
            onFocus={onFocus}
            onBlur={onBlur}
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
            sx={{
              position: 'relative',
              display: 'inline-block',
              boxSizing: 'border-box',
              width: '40px',
              height: '22px',
              borderRadius: '25%/50%',
              verticalAlign: 'top',
              backgroundColor: 'accentSurface',
              '&:before': {
                content: "''",
                position: 'absolute',
                top: '2px',
                left: '2px',
                display: 'inline-block',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'onPrimary',
              },
            }}
          />
        </label>
        {children && <Box>{children}</Box>}
      </Box>
    );
  }
);
