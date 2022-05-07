import { jsx } from '@theme-ui/core';
import { forwardRef, SelectHTMLAttributes } from 'react';
import { DISABLED_OPACITY } from '../../variables';
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, disabled, ...rest }: SelectProps, ref) => {
    return (
      <select
        disabled={disabled}
        style={{ opacity: disabled ? DISABLED_OPACITY : 1 }}
        sx={{
          height: 2,
          border: 'none',
          borderRadius: 4,
          padding: 1,
          lineHeight: 2,
          textIndent: 2
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </select>
    );
  }
);
