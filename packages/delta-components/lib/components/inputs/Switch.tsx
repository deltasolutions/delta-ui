import { jsx } from '@theme-ui/core';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {}

// TODO: Handle enter key.
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ disabled, onKeyDown, value, ...rest }: SwitchProps, ref) => {
    return (
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
            cursor: 'pointer',
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
          disabled={disabled}
          sx={{
            position: 'absolute',
            opacity: 0,
            cursor: 'pointer',
            height: '0',
            width: '0',
          }}
          checked={value as unknown as boolean}
          type="checkbox"
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
    );
  }
);
