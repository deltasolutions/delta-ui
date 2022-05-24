import { jsx } from '@theme-ui/core';
import { forwardRef, InputHTMLAttributes } from 'react';
import { Box } from '../Box';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  rounded?: boolean;
  size?: 'small' | 'medium';
}

// TODO: Rewrite with icons usage and ability to nest children.
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ rounded, size = 'medium', disabled, value, children, ...rest }, ref) => {
    return (
      <div
        sx={{
          '.container': {
            display: 'block',
            position: 'relative',
            paddingLeft: size === 'medium' ? '26px' : '20px',
            marginBottom: size === 'medium' ? '26px' : '20px',
            cursor: 'pointer',
            fontSize: '22px',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          },
          '.container input': {
            position: 'absolute',
            opacity: 0,
            cursor: 'pointer',
            height: '0',
            width: '0',
          },
          '.checkmark': {
            position: 'absolute',
            top: '0',
            left: '0',
            borderRadius: rounded ? '500px' : size === 'medium' ? 5 : 4,
            height: size === 'medium' ? '26px' : '20px',
            width: size === 'medium' ? '26px' : '20px',
            backgroundColor: 'accentSurface',
          },
          '.container input:checked ~ .checkmark': {
            backgroundColor: 'primary',
          },
          '.checkmark:after': {
            content: '""',
            position: 'absolute',
            display: 'none',
          },
          'input:focus-visible ~ .checkmark': {
            outlineOffset: -1,
            outlineWidth: 3,
            outlineStyle: 'solid',
          },
          '.container input:checked ~ .checkmark:after': { display: 'block' },
          '.container .checkmark:after': {
            left: size === 'medium' ? '9px' : '6.5px',
            top: size === 'medium' ? '5px' : '3px',
            width: size === 'medium' ? '5px' : '5px',
            height: size === 'medium' ? '10px' : '9px',
            borderColor: 'onPrimary',
            borderStyle: 'solid',
            borderWidth: size === 'medium' ? ' 0 3px 3px 0' : '0 2px 2px 0',
            WebkitTransform: 'rotate(45deg)',
            msTransform: 'rotate(45deg)',
            transform: 'rotate(45deg)',
          },
        }}
      >
        <label
          sx={disabled ? { opacity: 1, cursor: 'auto' } : {}}
          className="container"
        >
          <input
            ref={ref}
            checked={value === undefined ? undefined : Boolean(value)}
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
