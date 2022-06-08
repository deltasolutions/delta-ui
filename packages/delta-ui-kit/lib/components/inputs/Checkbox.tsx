import { jsx } from '@theme-ui/core';
import { forwardRef, InputHTMLAttributes, useCallback } from 'react';
import { Box } from '../containers';
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ disabled, children, value, ...rest }: CheckboxProps, ref) => {
    return (
      <label
        style={{
          ...(disabled && { opacity: 0.5, cursor: 'auto' }),
        }}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: '22px',
          gap: 2,
          position: 'relative',
          verticalAlign: 'middle',
          userSelect: 'none',
          'input:checked ~ .checkmark': {
            backgroundColor: 'primary',
          },
          'input:focus-visible + span': {
            outline: '2px solid',
            outlineColor: 'primary',
            outlineOffset: 2,
          },
          'input:checked ~ .checkmark:after': { display: 'block' },
        }}
      >
        {children && <Box>{children}</Box>}
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
            backgroundColor: 'accentSurface',
            '&:after': {
              content: '""',
              position: 'absolute',
              display: 'none',
              left: '7px',
              top: '4px',
              width: '5px',
              height: '9px',
              border: 'solid white',
              borderWidth: '0 3px 3px 0',
              WebkitTransform: 'rotate(45deg)',
              msTransform: 'rotate(45deg)',
              transform: 'rotate(45deg)',
            },
          }}
        />
      </label>
    );
  }
);
