import { jsx } from '@theme-ui/core';
import { LabelHTMLAttributes, forwardRef } from 'react';

export interface ContainerProps extends LabelHTMLAttributes<HTMLLabelElement> {}
export const Container = forwardRef<HTMLLabelElement, ContainerProps>(
  ({ children, ...rest }: ContainerProps, ref) => {
    return (
      <label
        sx={{
          width: '100%',
          position: 'relative',
          backgroundColor: 'tertiary',
          borderRadius: 4,
          p: '5px',
          gap: '2px',
          height: '100%',
          lineHeight: '1rem',
          letterSpacing: 'normal',
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          '&:focus-within': {
            outline: '5px auto -webkit-focus-ring-color'
          }
        }}
        {...rest}
        ref={ref}
      >
        {children}
      </label>
    );
  }
);
