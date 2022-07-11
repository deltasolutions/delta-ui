import { jsx } from '@theme-ui/core';
import { forwardRef, InputHTMLAttributes, useState } from 'react';
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
      onChange ? onChange(nextValue) : setInnerValue(nextValue);
    };
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value ?? false);
    }, [value]);

    return (
      <label
        style={{ opacity: disabled ? 0.5 : 1 }}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: '22px',
          gap: 2,
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
            background: 'accentOnContext',
          },
          'input:disabled + span': {
            opacity: 1,
          },
        }}
      >
        <input
          ref={ref}
          checked={innerValue}
          disabled={disabled}
          sx={{
            position: 'absolute',
            opacity: 0,
            cursor: 'default',
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
          sx={{
            position: 'relative',
            display: 'inline-block',
            boxSizing: 'border-box',
            width: '40px',
            height: '22px',
            borderRadius: '25%/50%',
            verticalAlign: 'top',
            backgroundColor: 'accentContext',
            '&:before': {
              content: "''",
              position: 'absolute',
              top: '2px',
              left: '2px',
              display: 'inline-block',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: 'accentOnPrimary',
            },
          }}
        />
        {children && <Box>{children}</Box>}
      </label>
    );
  }
);
