import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (props: BoxProps, ref) => {
    return (
      <div ref={ref} sx={{ boxSizing: 'border-box', minWidth: 0 }} {...props} />
    );
  }
);
