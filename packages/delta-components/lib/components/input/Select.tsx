import { jsx } from '@theme-ui/core';
import { forwardRef, SelectHTMLAttributes } from 'react';
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, disabled, multiple, ...rest }: SelectProps, ref) => {
    if (!multiple) {
      return (
        <select
          disabled={disabled}
          sx={{
            opacity: disabled ? 1 : 2,
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
    return (
      <select
        sx={{
          opacity: disabled ? 1 : 2,
          height: 2,
          border: 'none',
          borderRadius: 4,
          padding: 1,
          lineHeight: 2,
          textIndent: 2
        }}
      >
        {children}
      </select>
    );
  }
);
