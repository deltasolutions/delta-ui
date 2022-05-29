import { jsx } from '@theme-ui/core';
import { forwardRef, InputHTMLAttributes } from 'react';
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
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <label
          sx={{
            opacity: disabled ? 0.5 : 11,
            display: 'inline-block',
            height: '26px',
            position: 'relative',
            verticalAlign: 'middle',
            userSelect: 'none',
            'input:checked + span': {
              backgroundColor: 'primary',
            },
            'input:checked + span:before': {
              transform: 'translateX(22px)',
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
            checked={Boolean(value)}
            disabled={disabled}
            onChange={ev => onChange?.(ev.target.checked)}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={ev => {
              if (ev.key === 'Enter') {
                ev.preventDefault();
                onChange?.(!value);
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
              width: '46px',
              height: '24px',
              borderRadius: '25%/50%',
              verticalAlign: 'top',
              backgroundColor: 'accentSurface',
              '&:before': {
                content: "''",
                position: 'absolute',
                top: '2px',
                left: '2px',
                display: 'inline-block',
                width: '20px',
                height: '20px',
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
