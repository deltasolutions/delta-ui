import { jsx } from '@theme-ui/core';
import { forwardRef, InputHTMLAttributes, useCallback } from 'react';
import { DISABLED_OPACITY } from '../../variables';
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ disabled, value, ...rest }: CheckboxProps, ref) => {
    return (
      <div
        sx={{
          '.container': {
            display: 'block',
            position: 'relative',
            paddingLeft: '26px',
            marginBottom: '26px',
            cursor: 'pointer',
            fontSize: '22px',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none'
          },
          '.container input': {
            position: 'absolute',
            opacity: 0,
            cursor: 'pointer',
            height: '0',
            width: '0'
          },
          '.checkmark': {
            position: 'absolute',
            top: '0',
            left: '0',
            borderRadius: 5,
            height: '26px',
            width: '26px',
            backgroundColor: '#535353'
          },
          '.container input:checked ~ .checkmark': {
            backgroundColor: '#1db954'
          },
          '.checkmark:after': {
            content: '""',
            position: 'absolute',
            display: 'none'
          },
          'input:focus-visible ~ .checkmark': {
            outlineColor: 'essential_outline',
            outlineOffset: -1,
            outlineWidth: 3,
            outlineStyle: 'solid'
          },
          '.container input:checked ~ .checkmark:after': { display: 'block' },
          '.container .checkmark:after': {
            left: '9px',
            top: '5px',
            width: '5px',
            height: '10px',
            border: 'solid white',
            borderWidth: '0 3px 3px 0',
            WebkitTransform: 'rotate(45deg)',
            msTransform: 'rotate(45deg)',
            transform: 'rotate(45deg)'
          }
        }}
      >
        <label
          style={{
            ...(disabled && { opacity: DISABLED_OPACITY, cursor: 'auto' })
          }}
          className="container"
        >
          <input
            ref={ref}
            checked={value as unknown as boolean}
            disabled={disabled}
            type="checkbox"
            {...rest}
          />
          <span className="checkmark" />
        </label>
      </div>
    );
  }
);
